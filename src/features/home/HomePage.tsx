// src/features/home/HomePage.tsx
import { VideoHero } from '../../shared/components/VideoHero'
import { WhyChooseUs } from '../../shared/components/WhyChooseUs'
import { Section } from '../../shared/components/Section'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <VideoHero />

      {/* Versión breve / claim corto */}
      <section className="container-max py-8 md:py-10">
        <div className="card text-center">
          <h2 className="text-xl md:text-2xl font-serif text-brand-blue">
            Más de 100 años produciendo carnes de excelencia
          </h2>
          <p className="mt-3 text-gray-700 max-w-3xl mx-auto">
            Somos una empresa familiar que controla toda la cadena productiva: desde el engorde en nuestro feedlot
            hasta la faena, procesamiento y distribución. Con capacidad para procesar más de 190.000 cabezas bovinas
            al año y logística propia, garantizamos calidad, trazabilidad y entregas eficientes.
          </p>
        </div>
      </section>

      {/* Quiénes somos */}
      <Section id="quienes-somos" title="Quiénes somos">
        <div id="quienes-somos" className="grid md:grid-cols-2 gap-6 items-start scroll-mt-32 md:scroll-mt-36">
          <div className="card">
            <p className="text-gray-700">
              Somos una empresa familiar con más de 100 años de trayectoria en la actividad de la carne, dedicada
              al engorde de animales de calidad superior, su faena y distribución en el mercado interno.
            </p>
            <p className="text-gray-700 mt-3">
              Nuestra historia está marcada por el compromiso con la calidad, la innovación en los procesos productivos
              y una fuerte vocación de servicio hacia nuestros clientes.
            </p>
          </div>
          <div className="card">
            <h3 className="text-brand-blue font-semibold">Eslogan</h3>
            <p className="mt-2">“Larrauri: Carne Argentina de excelencia”.</p>
          </div>
        </div>
      </Section>

      {/* Cadena de valor */}
     <Section id="cadena-de-valor" title="Cadena de valor">
        <div id="cadena-de-valor" className="grid md:grid-cols-3 gap-6 scroll-mt-32 md:scroll-mt-36">
          <article className="card">
            <h3 className="text-brand-blue font-semibold">Engorde</h3>
            <p className="mt-2 text-gray-700">
              Feedlot propio con <strong>27.000</strong> cabezas permanentes y <strong>65.000</strong> junto a otros establecimientos.
              Trazabilidad y cuidado sanitario de principio a fin.
            </p>
          </article>

          <article className="card">
            <h3 className="text-brand-blue font-semibold">Faena y desposte</h3>
            <p className="mt-2 text-gray-700">
              Planta faenadora con capacidad de <strong>192.000</strong> cabezas/año y ciclo II para desposte de
              <strong> 400</strong> medias reses diarias (<strong>36.000 kg</strong> de cortes de alta calidad).
            </p>
          </article>

          <article className="card">
            <h3 className="text-brand-blue font-semibold">Valor agregado</h3>
            <p className="mt-2 text-gray-700">
              Procesamiento de subproductos: hemoglobina y plasma bovino en polvo para exportación.
              Planta de <strong>grasa bovina</strong> en construcción para industria alimentaria y cosmética.
            </p>
          </article>
        </div>
      </Section>

      {/* Por qué elegirnos */}
      <WhyChooseUs />

      {/* Productos */}
      <Section id="productos" title="Nuestros productos">
        <div id="productos" className="grid md:grid-cols-2 gap-6 items-center scroll-mt-32 md:scroll-mt-36">
          <div className="card">
            <p className="text-gray-700">
              Ofrecemos medias reses y cortes bovinos de primera calidad, obtenidos de animales criados bajo estrictos
              estándares de bienestar y alimentación controlada.
            </p>
            <p className="text-gray-700 mt-3">
              También producimos y exportamos subproductos de alto valor como hemoglobina y plasma bovino en polvo
              y cueros salados. Próximamente incorporaremos grasa bovina para la industria alimentaria y cosmética.
            </p>
            <div className="mt-4">
              <Link to="/producto" className="btn-primary">Ver portafolio</Link>
            </div>
          </div>
          <div className="card">
            <h3 className="text-brand-blue font-semibold">Líneas destacadas</h3>
            <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
              <li>Cortes bovinos premium</li>
              <li>Medias reses</li>
              <li>Subproductos (hemoglobina, plasma en polvo)</li>
              <li>Cueros salados</li>
              <li>Grasa bovina (próximamente)</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Impacto ambiental */}
      <Section title="Impacto ambiental">
        <div className="card" id="impacto-ambiental">
          <p className="text-gray-700">
            Entendemos que la producción responsable es clave para el futuro. Trabajamos para reducir el impacto ambiental
            aplicando uso eficiente de recursos, manejo adecuado de efluentes y residuos, y optimización del transporte
            para disminuir emisiones. Apostamos a una industria de la carne más sustentable, comprometida con el cuidado
            del entorno y las generaciones futuras.
          </p>
        </div>
      </Section>

      {/* Contacto (te lleva al formulario completo de /contacto) */}
      <Section id="contacto" title="Contacto">
        <div id="contacto" className="card text-center scroll-mt-32 md:scroll-mt-36">
          <p className="text-gray-700">
            ¿Querés iniciar una relación comercial o tenés consultas específicas?
          </p>
          <div className="mt-4">
            <Link to="/contacto" className="btn-primary">Ir al formulario</Link>
          </div>
        </div>
      </Section>
    </>
  )
}
