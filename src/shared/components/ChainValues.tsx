import * as React from 'react'
import feedlot from '../../assets/feedlot.jpg'
import feedlot2 from '../../assets/feedlot2.jpg'

type ChainTab = 'produccion' | 'frigorifico' | 'distribucion'
const TABS: { id: ChainTab; label: string }[] = [
  { id: 'produccion',   label: 'Producción' },
  { id: 'frigorifico',  label: 'Frigorífico' },
  { id: 'distribucion', label: 'Distribución' },
]

const GALERIA: Partial<Record<ChainTab, { src: string; alt: string }[]>> = {
  produccion: [
    { src: feedlot, alt: 'Cría y engorde en campo' },
    { src: feedlot2, alt: 'Alimentación y manejo' },
    { src: feedlot, alt: 'Feed lot' },
    { src: feedlot2, alt: 'Sanidad animal' },
  ],
  // frigorifico: [ ... ],
  // distribucion: [ ... ],
}

function GalleryGrid({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {images.map((img, i) => (
        <figure key={i} className="overflow-hidden rounded-2xl shadow-sm bg-white">
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
          <figcaption className="sr-only">{img.alt}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export function ChainValues() {
  // ✅ Estado inicial sin pestaña activa
  const [tab, setTab] = React.useState<ChainTab | null>(null)

  // navegación con flechas izquierda/derecha (funciona sólo si hay una activa)
  const onKeyDownTabs = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (tab == null) return
    const idx = TABS.findIndex(t => t.id === tab)
    if (e.key === 'ArrowRight') setTab(TABS[(idx + 1) % TABS.length].id)
    if (e.key === 'ArrowLeft')  setTab(TABS[(idx - 1 + TABS.length) % TABS.length].id)
  }

  const activeIdx = tab ? TABS.findIndex(t => t.id === tab) : -1
  const activeTab = tab ? TABS[activeIdx] : null
  const images = tab ? (GALERIA[tab] ?? []) : []

  return (
    <section id="cadena-de-valor" className="anchor-offset">
      <div className="container-max py-12 md:py-16">
        <div className="card">
          <h2 className="font-medium text-brand-blue text-3xl md:text-4xl items-start">
            Cadena de valor
          </h2>

          <div className="space-y-4 mt-8 mx-auto max-w-5xl">
            <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
              Nuestra actividad comienza con la cría y engorde de hacienda en establecimientos propios y de terceros, los animales luego se destinan a la faena o a la comercialización en pie, de acuerdo con las demandas del mercado.
            </p>
            <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
              Para sostener este proceso contamos con una planta faenadora con capacidad suficiente para abastecer el consumo interno y, al mismo tiempo, cumplir con los estándares más exigentes de exportación de cortes y subproductos ganaderos.
            </p>
            <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
              Agregamos valor mediante una planta de secado de sangre, donde obtenemos plasma y hemoglobina en polvo de alta calidad, destinados principalmente a la exportación.
            </p>
            <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
              Disponemos de un sistema de logística propia para el traslado de animales de invernada y faena, camiones para el traslado de alimentos para el engorde en nuestros feed lots y una flota de camiones refrigerados que aseguran la entrega en óptimas condiciones.
            </p>
            <p className="font-medium text-brand-blue/90 text-lg md:text-xl leading-8 text-center md:text-left">
              De esta manera garantizamos eficiencia, seguridad y calidad en todas las etapas de la cadena, optimizando los recursos y asegurando el cumplimiento de los compromisos con cada cliente.
            </p>
          </div>

          {/* Tabs + panel */}
          <div className="mt-10">
            <div
              role="tablist"
              aria-label="Secciones de la cadena de valor"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              onKeyDown={onKeyDownTabs}
            >
              {TABS.map((t, i) => {
                const active = t.id === tab
                const btnId = `tab-${t.id}`
                const panelId = `tabpanel-${t.id}`
                return (
                  <button
                    key={t.id}
                    id={btnId}
                    role="tab"
                    aria-selected={active}
                    aria-controls={panelId}
                    className={[
                      "px-4 py-2 rounded-2xl border text-sm font-semibold tracking-wide",
                      "transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/40",
                      active
                        ? "bg-white border-brand-blue text-brand-blue shadow-sm"
                        : "bg-brand-neutral/40 border-brand-blue text-brand-blue/70 hover:bg-brand-neutral/60"
                    ].join(' ')}
                    // ✅ Al hacer clic se activa y queda remarcado
                    onClick={() => setTab(t.id)}
                    // ✅ Si no hay activa, dejá accesibles todas (tabIndex 0); si hay activa, sólo esa queda en 0
                    tabIndex={tab ? (active ? 0 : -1) : 0}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>

            {/* ✅ Panel: sólo se muestra cuando hay pestaña seleccionada */}
            {activeTab ? (
              <div
                id={`tabpanel-${activeTab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab.id}`}
                className="mt-6"
              >
                {images.length > 0 ? (
                  <GalleryGrid images={images} />
                ) : (
                  <div className="card">
                    <p className="text-gray-700">
                      Contenido de <span className="font-medium">{activeTab.label}</span> próximamente.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // ✅ Mensaje inicial sin imágenes
              <div className="mt-6 card">
                <p className="text-gray-700">
                  Elegí una etapa para ver las fotos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
