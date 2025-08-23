import * as React from 'react'
import { Section } from '../../shared/components/Section'
import { useInViewOnce } from '../../shared/hooks/useInViewOnce'
import { useRafCounter } from '../../shared/hooks/useRafCounter'

type StatItem = {
  value: number
  unit: string
  desc: string
}

const STATS: StatItem[] = [
  { value: 70000,  unit: 'CABEZAS/MES',   desc: 'Animales en confinamiento simultáneo para cría y engorde' },
  { value: 100000, unit: 'TONELADAS/AÑO', desc: 'De alimento destinado al engorde' },
  { value: 15000,  unit: 'CABEZAS/MES',   desc: 'Procesadas en la planta para carne y subproductos' },
  { value: 120000, unit: 'CABEZAS/AÑO',   desc: 'Destinadas al consumo interno y la exportación' },
  { value: 36000,  unit: 'TONELADAS/AÑO', desc: 'De carne premium para el consumo interno' },
]

// formateo 70.000 (es-AR)
const fmt = new Intl.NumberFormat('es-AR')

function Row({ start, item }: { start: boolean; item: StatItem }) {
  const n = useRafCounter(item.value, { start, duration: 1000 })
  const percent = start ? 100 : 0

  return (
   <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,max-content),1fr] items-center gap-4">
      {/* Número grande */}
      <div className="order-1 md:order-none">
        <div
          className={[
            // caja
            "w-full rounded-2xl bg-white border border-brand-blue/10 shadow-sm",
            // centrado perfecto
            "flex items-center justify-center text-center",
            // tipografía
            "text-brand-blue font-extrabold text-3xl md:text-4xl",
            // espaciado y altura consistente
            "px-5 py-4 md:py-5 min-h-[64px]",
            // evitar wraps y jitter
            "whitespace-nowrap leading-none tracking-tight tabular-nums",
            // reservar ancho según tu peor caso (+120.000 ≈ 9ch)
            "min-w-[10ch]"
          ].join(' ')}
        >
          +{fmt.format(n)}
        </div>
      </div>

      {/* Texto + barra */}
      <div className="order-2">
        <div className="inline-flex items-center gap-3">
          <span className="text-[12px] md:text-sm font-semibold tracking-wide text-brand-blue bg-brand-neutral/30 border border-brand-blue/10 rounded-full px-3 py-1">
            {item.unit}
          </span>
        </div>

        <div className="mt-2 h-3 rounded-full bg-brand-blue/15 overflow-hidden">
          <div
            className="h-full bg-brand-blue transition-[width] duration-[1500ms] ease-out rounded-full"
            style={{ width: `${percent}%` }}
            aria-hidden
          />
        </div>

        <p className="mt-2 text-sm md:text-base text-brand-blue/90">{item.desc}</p>
      </div>
    </div>
  )
}

export default function StatsSection() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0,
  })

  return (
    <section id="cifras" className="anchor-offset">
      <div className="container-max py-12 md:py-16">
        <div ref={ref} className="card">
          <h2 className="font-medium text-brand-blue text-3xl md:text-4xl">
            Nuestras cifras
          </h2>

          <div className="mt-8 mx-auto max-w-5xl space-y-6">
            {STATS.map((item, i) => (
              <Row key={i} start={inView} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
