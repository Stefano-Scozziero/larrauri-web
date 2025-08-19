import { Section } from '../../shared/components/Section'

type Product = { id: string; name: string; desc: string }

const MOCK: Product[] = [
  { id: '1', name: 'Cortes Premium', desc: 'Selección de cortes de máxima calidad.' },
  { id: '2', name: 'Medias reses', desc: 'Abastecimiento continuo para el canal mayorista.' },
  { id: '3', name: 'Subproductos', desc: 'Derivados y valor agregado para exportación.' },
]

export default function ProductPage() {
  return (
    <>
      <Section title="Portafolio de productos">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {MOCK.map(p => (
            <article key={p.id} className="card">
              <h3 className="text-xl font-serif text-brand-blue">{p.name}</h3>
              <p className="mt-2 text-gray-700">{p.desc}</p>
              <div className="mt-4">
                <button className="btn-secondary">Consultar</button>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}
