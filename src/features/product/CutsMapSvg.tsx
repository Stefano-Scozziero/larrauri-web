import * as React from 'react'
import type { Cut } from './cuts.data'

type Props = {
  cuts: Cut[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  hoveredId?: string | null
}

/** Inserta /medias-reses.svg y lo vuelve interactivo. */
export function CutsMapSvg({ cuts, selectedId, onSelect, hoveredId }: Props) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [svgLoaded, setSvgLoaded] = React.useState(false)

  // 1) Insertar SVG literal en el DOM
  React.useEffect(() => {
    let cancelled = false
    fetch('/medias-reses.svg')
      .then(r => r.text())
      .then(svg => {
        if (cancelled) return
        const wrapper = wrapperRef.current
        if (!wrapper) return
        wrapper.innerHTML = svg

        const rootSvg = wrapper.querySelector('svg') as SVGSVGElement | null
        if (!rootSvg) return

        // Responsivo
        if (!rootSvg.getAttribute('viewBox')) {
          const w = Number(rootSvg.getAttribute('width') || 800)
          const h = Number(rootSvg.getAttribute('height') || 600)
          rootSvg.setAttribute('viewBox', `0 0 ${w} ${h}`)
          rootSvg.removeAttribute('width')
          rootSvg.removeAttribute('height')
        }
        rootSvg.classList.add('w-full', 'h-auto')

        // Desactivar anchors heredados del sitio original
        rootSvg.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', (e) => e.preventDefault())
          a.setAttribute('href', '#')
        })

        // Activar regiones
        const validIds = new Set(cuts.map(c => `C${c.id}`)) // C01..C15
        rootSvg.querySelectorAll<SVGPathElement>('path.corte').forEach(p => {
          if (!validIds.has(p.id)) return

          // Quitar opacity inline del original (si lo trae)
          p.style.opacity = ''

          // Click → seleccionar
          p.addEventListener('click', (e) => {
            e.preventDefault()
            const num = p.id.replace(/^C/, '').padStart(2, '0')
            onSelect(num)
          })
        })

        setSvgLoaded(true)
      })
      .catch(console.error)
    return () => { cancelled = true }
  }, [cuts, onSelect])

  // 2) Pinta región activa
  React.useEffect(() => {
    if (!svgLoaded) return
    const svg = wrapperRef.current?.querySelector('svg')
    if (!svg) return
    svg.querySelectorAll('.corte.active').forEach(el => el.classList.remove('active'))
    const el = svg.querySelector<SVGPathElement>(`#C${selectedId}`)
    if (el) el.classList.add('active')
  }, [svgLoaded, selectedId])

  // 3) Pinta hover (cuando viene desde la lista)
  React.useEffect(() => {
    if (!svgLoaded) return
    const svg = wrapperRef.current?.querySelector('svg')
    if (!svg) return
    svg.querySelectorAll('.corte.hover').forEach(el => el.classList.remove('hover'))
    if (hoveredId) {
      const el = svg.querySelector<SVGPathElement>(`#C${hoveredId}`)
      if (el) el.classList.add('hover')
    }
  }, [svgLoaded, hoveredId])

  return (
    <div className="card">
      <div ref={wrapperRef} />
      <p className="text-xs text-gray-500 mt-2">
        Diagrama literal (SVG). Clic en un número para ver el corte.
      </p>
    </div>
  )
}
