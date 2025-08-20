import * as React from 'react'
import { Section } from '../../shared/components/Section'
import { CUTS } from './cuts.data'
import { CutsList } from './CutsList'
import { CutsMapSvg } from './CutsMapSvg'

export default function ProductPage() {
  const [selectedId, setSelectedId] = React.useState(CUTS[0].id) // "01"
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)

  return (
    <Section title="Mercado interno">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <CutsList
          cuts={CUTS}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onHover={setHoveredId}     // ⬅️ resalta en el mapa
        />
        <CutsMapSvg
          cuts={CUTS}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={setSelectedId}
        />
      </div>
    </Section>
  )
}
