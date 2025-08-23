// src/shared/hooks/useActiveSection.ts
import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type ActiveId = 'inicio' | string

type Options = {
  /** Px extra además del header para el margen superior del observer/scroll-margin */
  offsetPx?: number
  /** Porcentaje de ventana ignorado desde abajo (para evitar early-activations) */
  bottomViewportExclusion?: string // ej: '70%'
  /** Duración mínima/máxima del timeout de respaldo cuando no hay scrollend */
  fallbackMinMs?: number
  fallbackMaxMs?: number
}

/**
 * Detecta y controla la sección activa con IO + lock durante desplazamientos programáticos.
 * - Compensa header sticky mediante rootMargin y scroll-margin-top.
 * - Empate entre múltiples visibles: elige la más cercana a la línea superior (prioriza top<=0).
 * - "Inicio" cuando scrollY <= 2.
 * - Clic: activa lock hasta `scrollend` o timeout de respaldo.
 * - Carga con hash y back/forward: posiciona y marca correctamente.
 */
export function useActiveSection(
  sectionIds: string[],
  headerH: number,
  {
    offsetPx = 12,
    bottomViewportExclusion = '70%',
    fallbackMinMs = 400,
    fallbackMaxMs = 1200,
  }: Options = {}
) {
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()

  const [activeId, setActiveId] = React.useState<ActiveId>('inicio')

  // --- refs de control
  const lockRef = React.useRef(false)                   // bloquea updates del observer mientras hay scroll program.
  const timeoutRef = React.useRef<number | null>(null)  // timeout de respaldo
  const visibleRef = React.useRef<Set<string>>(new Set())
  const didInitialHashScroll = React.useRef(false)      // evita repetir el ensure-scroll inicial
  const lastNavClickTs = React.useRef(0)                // diferencia clic vs back/forward por tiempo

  // Utilidades
  const headerOffset = React.useCallback(() => headerH + offsetPx, [headerH, offsetPx])
  const getEl = (id: string) => document.getElementById(id)

  const clearFallback = () => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const unlock = React.useCallback(() => {
    lockRef.current = false
    clearFallback()
    window.removeEventListener('scrollend', onScrollEndOnce as any)
  }, [])

  // Necesitamos referenciar la función para removerla en unlock.
  const onScrollEndOnce = React.useMemo(() => {
    const handler = () => unlock()
    return handler
  }, [unlock])

  const scheduleUnlock = React.useCallback((distancePx: number | null) => {
    // Polyfill de scrollend con timeout aproximado a la distancia
    const approx = distancePx != null
      ? Math.max(fallbackMinMs, Math.min(fallbackMaxMs, Math.floor(distancePx / 1.5)))
      : fallbackMinMs

    clearFallback()

    window.addEventListener('scrollend', onScrollEndOnce as any, { once: true } as any)

    timeoutRef.current = window.setTimeout(() => {
      unlock()
    }, approx)
  }, [fallbackMinMs, fallbackMaxMs, unlock, onScrollEndOnce])

  const pickClosestToTop = React.useCallback(() => {
    if (lockRef.current) return

    // Regla de "Inicio"
    if (window.scrollY <= 2) {
      setActiveId('inicio')
      return
    }

    const idsPresent = sectionIds.filter(id => !!getEl(id))
    if (idsPresent.length === 0) return

    const offset = headerOffset()
    type Row = { id: string; top: number; isVisible: boolean }
    const rows: Row[] = idsPresent.map(id => {
      const el = getEl(id)!
      const top = el.getBoundingClientRect().top - offset
      const isVisible = visibleRef.current.has(id)
      return { id, top, isVisible }
    })

    // Preferir las visibles
    const visibles = rows.filter(r => r.isVisible)
    const source = (visibles.length ? visibles : rows)

    // 1) Priorizar las que ya pasaron la línea (top <= 0): tomar la que tenga top más cercano a 0 (el mayor).
    const passed = source.filter(r => r.top <= 0).sort((a, b) => b.top - a.top)
    if (passed.length) {
      setActiveId(passed[0].id)
      return
    }

    // 2) Si ninguna pasó, la más cercana hacia abajo (top positivo más chico).
    const below = source
      .filter(r => r.top > 0)
      .sort((a, b) => a.top - b.top)
    if (below.length) setActiveId(below[0].id)
  }, [sectionIds, headerOffset])

  // IntersectionObserver: marca visibles y dispara pickClosestToTop (salteado si hay lock)
  React.useEffect(() => {
    if (!sectionIds.length) return

    const rootMargin = `-${headerOffset()}px 0px -${bottomViewportExclusion} 0px`
    const io = new IntersectionObserver((entries) => {
      if (lockRef.current) return
      let changed = false
      for (const e of entries) {
        const id = e.target.id
        if (!id) continue
        if (e.isIntersecting) {
          if (!visibleRef.current.has(id)) {
            visibleRef.current.add(id)
            changed = true
          }
        } else if (visibleRef.current.delete(id)) {
          changed = true
        }
      }
      // Reevalúa cuando cambia el conjunto visible (y también en scroll para "fine-tune")
      if (changed) {
        // Usamos rAF para tomar lecturas consistentes de layout
        requestAnimationFrame(pickClosestToTop)
      }
    }, {
      root: null,
      rootMargin,
      threshold: 0, // Notificá apenas entra/sale (el rootMargin hace el trabajo)
    })

    // Observamos sólo elementos presentes
    for (const id of sectionIds) {
      const el = getEl(id)
      if (el) io.observe(el)
    }

    // Primera evaluación
    requestAnimationFrame(pickClosestToTop)

    return () => {
      io.disconnect()
      visibleRef.current.clear()
    }
  }, [sectionIds, bottomViewportExclusion, headerOffset, pickClosestToTop])

  // Pequeña ayuda para “fine-tune” de cercanía mientras hay intersecciones (sin jitter).
  React.useEffect(() => {
    const onScroll = () => {
      if (lockRef.current) return
      requestAnimationFrame(pickClosestToTop) // ✅ sin early-return por size===0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pickClosestToTop])


  // Carga inicial con hash: una sola vez (cuando ya se midió headerH)
  React.useEffect(() => {
    if (didInitialHashScroll.current) return
    if (pathname !== '/') return
    if (!hash) return
    if (!headerH) return

    const id = hash.slice(1)
    if (!id) return

    let tries = 0
    const maxTries = 20
    const tryScroll = () => {
      const el = getEl(id)
      if (el) {
        // Lock corto para evitar que IO "pise" el activo inicial
        lockRef.current = true
        setActiveId(id as ActiveId)
        // Posicionamiento inmediato (sin smooth) en carga directa
        el.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' })
        // Soltamos lock en el próximo frame para permitir que el observer tome el control
        requestAnimationFrame(() => { lockRef.current = false })
        didInitialHashScroll.current = true
      } else if (tries++ < maxTries) {
        requestAnimationFrame(tryScroll)
      }
    }
    requestAnimationFrame(tryScroll)
  }, [pathname, hash, headerH])

  // Back/forward (cambio de hash “no originado por clic”): smooth + lock
  React.useEffect(() => {
    if (pathname !== '/') return
    // Si esto ocurrió muy cerca de un clic nuestro, lo ignoramos (ya manejado por el clic)
    const elapsed = performance.now() - lastNavClickTs.current
    if (!hash || elapsed < 200) return

    const id = hash.slice(1)
    if (!id) {
      lockRef.current = true
      setActiveId('inicio')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      scheduleUnlock(Math.abs(window.scrollY - 0))
      return
    }

    const el = getEl(id)
    if (el) {
      lockRef.current = true
      setActiveId(id as ActiveId)
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const distance = Math.abs((el.getBoundingClientRect().top - headerOffset()))
      scheduleUnlock(distance)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, pathname]) // (depende indirectamente de headerH vía scroll-margin-top)

  // Clic de navegación en el menú (feedback inmediato + lock + smooth + hash aggiornado)
  const onNavClick = React.useCallback((id?: string) => {
    lastNavClickTs.current = performance.now()

    // Inicio
    if (!id) {
      if (location.pathname + location.hash !== '/') navigate('/', { replace: false })
      lockRef.current = true
      setActiveId('inicio')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      scheduleUnlock(Math.abs(window.scrollY - 0))
      return
    }

    // Scroll primero (sin tocar el hash aún)
    const el = getEl(id)
    lockRef.current = true
    setActiveId(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const distance = Math.abs((el.getBoundingClientRect().top - headerOffset()))
      scheduleUnlock(distance)
    } else {
      scheduleUnlock(0)
    }

    // Ahora sí, actualizamos la URL sin provocar salto visible
    const targetHash = `#${id}`
    if (location.hash !== targetHash) {
      // Usá pushState/replaceState directo para evitar cualquier scroll interno del router
      history.pushState(null, '', `/${targetHash}`)
    } else {
      history.replaceState(null, '', `/${targetHash}`)
    }
  }, [navigate, scheduleUnlock, headerOffset])

  // Limpieza al desmontar
  React.useEffect(() => () => {
    clearFallback()
    window.removeEventListener('scrollend', onScrollEndOnce as any)
  }, [onScrollEndOnce])

  return { activeId, onNavClick }
}
