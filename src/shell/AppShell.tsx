// src/shell/AppShell.tsx
import * as React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo_larrauri.png'

type Item = { id?: string; label: string }
const NAV: Item[] = [
  { label: 'Inicio' },
  { id: 'quienes-somos', label: 'Quiénes somos' },
  { id: 'nuestra-marca', label: 'Nuestra Marca' },
  { id: 'cadena-de-valor', label: 'Cadena de valor' },
  { id: 'productos', label: 'Productos' },
  { id: 'contacto', label: 'Contacto' },
]

// Scroll automático cuando cambia la URL (incluye hash)
// Mantiene compatibilidad con navegación programática (pushState abajo).
function ScrollToHash() {
  const { pathname, hash } = useLocation()
  React.useEffect(() => {
    if (pathname !== '/') return
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    let tries = 0
    const scroll = () => {
      const el = document.querySelector(hash) as HTMLElement | null
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (tries < 16) { tries += 1; requestAnimationFrame(scroll) }
    }
    requestAnimationFrame(scroll)
  }, [pathname, hash])
  return null
}

export function AppShell() {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const [headerH, setHeaderH] = React.useState(0)
  const [active, setActive] = React.useState<string>('inicio')
  const navigate = useNavigate()

  // medir header y exponer --header-h para .anchor-offset
  React.useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const setH = () => {
      const h = el.getBoundingClientRect().height
      setHeaderH(h)
      document.documentElement.style.setProperty('--header-h', `${h}px`)
    }
    setH()
    const ro = new ResizeObserver(setH)
    ro.observe(el)
    window.addEventListener('resize', setH)
    return () => { ro.disconnect(); window.removeEventListener('resize', setH) }
  }, [])

  // === NUEVO: cálculo robusto del item activo basado en scroll ===
  React.useEffect(() => {
    const ids = NAV.filter(n => n.id).map(n => n.id!) // solo secciones
    if (!ids.length) return

    const headerOffset = () => headerH + 12

    let ticking = false
    const updateActive = () => {
      ticking = false
      // Si estamos arriba del todo, "inicio"
      if (window.scrollY <= 2) {
        setActive('inicio')
        return
      }

      type T = { id: string; top: number }
      const tops: T[] = []
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top - headerOffset()
        tops.push({ id, top })
      }
      if (!tops.length) return

      // 1) Sección más abajo de la línea superior pero lo más cercana (top <= 0, el mayor)
      const above = tops.filter(t => t.top <= 0).sort((a, b) => b.top - a.top)
      if (above.length) {
        setActive(above[0].id)
        return
      }
      // 2) Si ninguna pasó la línea, tomamos la más cercana hacia abajo (top más chico positivo)
      const below = tops.filter(t => t.top > 0).sort((a, b) => a.top - b.top)
      setActive(below[0].id)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateActive)
      }
    }

    // run al montar y en resize (por si cambia headerH)
    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [headerH])

  // Clases
  const linkClass = (id?: string) =>
    `nav-link ${ (id ? active === id : active === 'inicio') ? 'nav-link-active' : '' }`

  // === NUEVO: navegación programática que SIEMPRE scrollea (aunque el hash no cambie) ===
  const scrollToId = (id?: string) => {
    if (!id) {
      // Inicio
      navigate('/', { replace: false })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActive('inicio')
      return
    }
    const el = document.getElementById(id)
    // actualizamos URL (incluso si es el mismo hash)
    const url = `/#${id}`
    if (location.hash !== `#${id}`) {
      history.pushState(null, '', url)
    } else {
      // mismo hash → igual “forzamos” un history para re-trigger visual
      history.replaceState(null, '', url)
    }
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id) // feedback inmediato
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <header ref={headerRef} className="sticky top-0 z-50 bg-[#1f2937] backdrop-blur ">
        <div className="container-max py-1">
          <div className="flex justify-center">
            <Link to="/" className="inline-flex items-center gap-2" onClick={(e) => { e.preventDefault(); scrollToId(undefined) }}>
              <img src={logo} alt="Larrauri" className="h-auto max-h-[150px] w-auto my-3" />
            </Link>
          </div>

          <nav className="rounded-2xl mt-2 flex flex-wrap items-center justify-center gap-2 md:gap-2 bg-white/95">
            {NAV.map(item =>
              item.id ? (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={linkClass(item.id)}
                  onClick={(e) => { e.preventDefault(); scrollToId(item.id) }}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key="inicio"
                  href="/"
                  className={linkClass(undefined)}
                  onClick={(e) => { e.preventDefault(); scrollToId(undefined) }}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <ScrollToHash />
        <React.Suspense fallback={null}>
          <Outlet />
        </React.Suspense>
      </main>

      <footer className="mt-12 border-t bg-white">
        <div className="container-max py-8 text-sm text-gray-600">
          © {new Date().getFullYear()} Larrauri — Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
