import * as React from 'react'
import { Outlet } from 'react-router-dom'   // ⬅️ vuelve a importar Outlet
import logo from '../assets/logo-finlar-login.png'

type Item = { id?: string; label: string }
const NAV: Item[] = [
  { label: 'Inicio' },
  { id: 'quienes-somos', label: 'Quiénes somos' },
  { id: 'cadena-de-valor', label: 'Cadena de valor' },
  { id: 'por-que-elegirnos', label: 'Por qué elegirnos' },
  { id: 'productos', label: 'Productos' },
  { id: 'contacto', label: 'Contacto' },
]

export function AppShell() {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const [headerH, setHeaderH] = React.useState(0)
  const [active, setActive] = React.useState<string>('')

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

  const scrollToId = (id?: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (!id) {
      window.history.pushState(null, '', '/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActive('inicio')
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    const y = window.scrollY + el.getBoundingClientRect().top - headerH - 12
    window.history.pushState(null, '', `/#${id}`)
    window.scrollTo({ top: y, behavior: 'smooth' })
    setActive(id)
  }

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
    <div className="min-h-screen flex flex-col">
      <header ref={headerRef} className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="container-max py-3">
          <div className="flex justify-center">
            <a href="/" onClick={scrollToId(undefined)} className="inline-flex items-center gap-2">
              <img src={logo} alt="Larrauri" className="h-[120px] md:h-[120px] w-auto" />
            </a>
          </div>
          <nav className="mt-3 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {NAV.map(item =>
              item.id ? (
                <a key={item.id} href={`/#${item.id}`} onClick={scrollToId(item.id)} className={linkClass(item.id)}>
                  {item.label}
                </a>
              ) : (
                <a key="inicio" href="/" onClick={scrollToId(undefined)} className={linkClass(undefined)}>
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ⬇️ acá vuelve el contenido de las rutas hijas */}
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
