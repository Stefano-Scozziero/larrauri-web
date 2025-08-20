// src/shell/AppShell.tsx
import * as React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import logo from '../assets/larrauri-logo.png'

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
// Usa scroll-margin-top (clase .anchor-offset) para compensar el header.
function ScrollToHash() {
  const { pathname, hash } = useLocation()

  React.useEffect(() => {
    if (pathname !== '/') return
    // si no hay hash, subo arriba
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    let tries = 0
    const scroll = () => {
      const el = document.querySelector(hash) as HTMLElement | null
      if (el) {
        // la clase .anchor-offset hará el offset del header
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (tries < 16) {
        tries += 1
        requestAnimationFrame(scroll) // reintenta hasta que monte el Home
      }
    }
    requestAnimationFrame(scroll)
  }, [pathname, hash])

  return null
}

export function AppShell() {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const [headerH, setHeaderH] = React.useState(0)
  const [active, setActive] = React.useState<string>('')

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

  // Marcar activo con IntersectionObserver (solo cuando el Home está montado)
  React.useEffect(() => {
    const ids = NAV.filter(n => n.id).map(n => n.id!)
    const els = ids.map(id => document.getElementById(id)).filter((x): x is HTMLElement => !!x)
    if (!els.length) return
    const obs = new IntersectionObserver((entries) => {
      let topMost: { id: string; top: number } | null = null
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const id = (e.target as HTMLElement).id
        const top = e.boundingClientRect.top
        if (!topMost || top < topMost.top) topMost = { id, top }
      }
      if (topMost) setActive(topMost.id)
      if (window.scrollY < 10) setActive('inicio')
    }, {
      root: null,
      rootMargin: `-${headerH + 12}px 0px -60% 0px`,
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [headerH])

  const linkClass = (id?: string) =>
    `nav-link ${ (id ? active === id : active === 'inicio') ? 'nav-link-active' : '' }`

  return (
    <div className="min-h-screen flex flex-col ">
      <header ref={headerRef} className="sticky top-0 z-50 bg-[#1f2937] backdrop-blur ">
        <div className="container-max py-1">
          <div className="flex justify-center">
            <Link to="/" className="inline-flex items-center gap-2" onClick={() => setActive('inicio')}>
              <img src={logo} alt="Larrauri" className="h-[140px] md:h-[140px] w-auto my-3" />
            </Link>
          </div>

          <nav className="rounded-2xl mt-2 flex flex-wrap items-center justify-center gap-2 md:gap-2 bg-white/95">
            {NAV.map(item =>
              item.id ? (
                <Link key={item.id} to={`/#${item.id}`} className={linkClass(item.id)}>
                  {item.label}
                </Link>
              ) : (
                <Link key="inicio" to="/" className={linkClass(undefined)}>
                  {item.label}
                </Link>
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
