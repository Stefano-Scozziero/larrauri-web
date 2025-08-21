// src/features/product/ProductPage.tsx
import * as React from 'react'
import { Section } from '../../shared/components/Section'
import { CUTS } from './cuts.data'
import { CutsList } from './CutsList'
import { CutsMapSvg } from './CutsMapSvg'

type ProductTab = 'carnicos' | 'subproductos' | 'menudencia' | 'hacienda'
const TABS: { id: ProductTab; label: string }[] = [
  { id: 'carnicos',     label: 'PRODUCTOS CÁRNICOS' },
  { id: 'subproductos', label: 'SUBPRODUCTOS' },
  { id: 'menudencia',   label: 'MENUDENCIA' },
  { id: 'hacienda',     label: 'HACIENDA' },
]

export default function ProductPage() {
  const [tab, setTab] = React.useState<ProductTab>('carnicos')
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)

  // navegación con flechas izquierda/derecha
  const onKeyDownTabs = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = TABS.findIndex(t => t.id === tab)
    if (e.key === 'ArrowRight') setTab(TABS[(idx + 1) % TABS.length].id)
    if (e.key === 'ArrowLeft')  setTab(TABS[(idx - 1 + TABS.length) % TABS.length].id)
  }

  return (
    <Section id="productos">
      {/* ⬇️ Tabs entre el título y los items */}
      <div
        role="tablist"
        aria-label="Categorías de productos"
        className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
        onKeyDown={onKeyDownTabs}
      >
        {TABS.map(t => {
          const active = t.id === tab
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              className={[
                "px-4 py-2 rounded-2xl border text-xs sm:text-sm font-semibold tracking-wide",
                "transition-colors",
                active
                  ? "bg-white border-brand-blue text-brand-blue shadow-sm"
                  : "bg-brand-neutral/40 border-brand-blue text-brand-blue/70 hover:bg-brand-neutral/60"
              ].join(' ')}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Contenido por pestaña */}
      {tab === 'carnicos' ? (
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <CutsList
            cuts={CUTS}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onHover={setHoveredId}
          />
          <CutsMapSvg
            cuts={CUTS}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={setSelectedId}
          />
        </div>
      ) : (
        <div className="card">
          <p className="text-gray-700">
            Contenido de <span className="font-medium">{TABS.find(t => t.id === tab)?.label}</span> próximamente.
          </p>
        </div>
      )}
    </Section>
  )
}
