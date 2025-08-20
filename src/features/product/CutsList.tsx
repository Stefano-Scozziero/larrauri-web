import * as React from 'react'
import type { Cut } from './cuts.data'

type Props = {
  cuts: Cut[]
  selectedId: string
  onSelect: (id: string) => void
  onHover?: (id: string | null) => void   // ⬅️ nuevo
}

export function CutsList({ cuts, selectedId, onSelect, onHover }: Props) {
  const refs = React.useRef<Record<string, HTMLDivElement | null>>({})

  React.useEffect(() => {
    const el = refs.current[selectedId]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [selectedId])

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = cuts.findIndex(c => c.id === selectedId)
      if (idx === -1) return
      if (e.key === 'ArrowDown') onSelect((cuts[idx + 1] ?? cuts[0]).id)
      else if (e.key === 'ArrowUp') onSelect((cuts[idx - 1] ?? cuts[cuts.length - 1]).id)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [cuts, selectedId, onSelect])

  return (
    <div className="card">
      <div className="max-h-[520px] overflow-auto pr-1">
        {cuts.map((c, i) => {
          const open = c.id === selectedId
          return (
            <div
              key={c.id}
              ref={(el) => (refs.current[c.id] = el)}
              className={`border rounded-2xl overflow-hidden mb-3 ${open ? 'border-brand-blue' : 'border-gray-200'}`}
              onMouseEnter={() => onHover?.(c.id)}
              onMouseLeave={() => onHover?.(null)}
            >
              <button
                onClick={() => onSelect(c.id)}
                className="w-full text-left px-4 py-3 bg-white hover:bg-brand-neutral/60 flex items-center justify-between"
              >
                <span className="font-medium text-brand-blue">
                  {String(i + 1).padStart(2, '0')}. {c.name}
                </span>
                <span className="text-brand-blue">{open ? '–' : '+'}</span>
              </button>

              {open && (
                <div className="px-4 pb-4 bg-brand-neutral/20">
                  <div className="grid md:grid-cols-2 gap-4">
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-full h-40 object-cover rounded-xl border"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1604908815842-0029d9d9a5df?q=80&w=800&auto=format&fit=crop' }}
                    />
                    <p className="text-gray-700">{c.desc}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
