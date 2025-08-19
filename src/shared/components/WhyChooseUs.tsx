// src/shared/components/WhyChooseUs.tsx
type Item = { title: string; desc: string; icon: string }

const ITEMS: Item[] = [
  {
    title: 'Experiencia',
    desc: 'Más de seis décadas de experiencia en el mercado.',
    icon: '🏛️',
  },
  {
    title: 'Control total',
    desc: 'Desde el engorde hasta la distribución: una cadena productiva integrada.',
    icon: '🔗',
  },
  {
    title: 'Trazabilidad',
    desc: 'Trazabilidad y salubridad garantizadas en cada etapa.',
    icon: '✅',
  },
  {
    title: 'Escala industrial',
    desc: 'Capacidad de gran escala con tecnología de última generación.',
    icon: '🏭',
  },
  {
    title: 'Logística propia',
    desc: 'Eficiencia y puntualidad en cada entrega.',
    icon: '🚚',
  },
]

export function WhyChooseUs() {
  return (
    <section id="por-que-elegirnos" className="bg-brand-neutral/60 scroll-mt-32 md:scroll-mt-36">
      <div className="container-max py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-serif text-brand-blue text-center">
          ¿Por qué elegirnos?
        </h2>
        <p className="mt-3 text-gray-700 text-center max-w-2xl mx-auto">
          Calidad, trazabilidad y una operación integrada que asegura consistencia y cumplimiento.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <article key={it.title} className="card text-center">
              <div className="text-3xl">{it.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-brand-blue">{it.title}</h3>
              <p className="mt-2 text-gray-700">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
