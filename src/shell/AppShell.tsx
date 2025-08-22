// src/shell/AppShell.tsx
import * as React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/logo_larrauri.png'
import { useActiveSection } from '../shared/hooks/useActiveSection'

type Item = { id?: string; label: string }
const NAV: Item[] = [
  { label: 'Inicio' },
  { id: 'quienes-somos', label: 'Quiénes somos' },
  { id: 'nuestra-marca', label: 'Nuestra Marca' },
  { id: 'cadena-de-valor', label: 'Cadena de valor' },
  { id: 'productos', label: 'Productos' },
  { id: 'contacto', label: 'Contacto' },
]

export function AppShell() {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const [headerH, setHeaderH] = React.useState(0)

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

  const SECTION_IDS = React.useMemo(
    () => NAV.filter(n => n.id).map(n => n.id!) as string[],
    []
  )

  const { activeId, onNavClick } = useActiveSection(SECTION_IDS, headerH)

  const linkClass = (id?: string) =>
    `nav-link ${ (id ? activeId === id : activeId === 'inicio') ? 'nav-link-active' : '' }`

  return (
    <div className="min-h-screen flex flex-col ">
      <header ref={headerRef} className="sticky top-0 z-50 bg-[#1f2937] backdrop-blur ">
        <div className="container-max py-1">
          <div className="flex justify-center">
            <Link to="/" className="inline-flex items-center gap-2" onClick={(e) => { e.preventDefault(); onNavClick(undefined) }}>
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
                  onClick={(e) => { e.preventDefault(); onNavClick(item.id) }}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key="inicio"
                  href="/"
                  className={linkClass(undefined)}
                  onClick={(e) => { e.preventDefault(); onNavClick(undefined) }}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
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
