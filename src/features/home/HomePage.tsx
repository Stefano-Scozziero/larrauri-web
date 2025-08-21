// src/features/home/HomePage.tsx
import { VideoHero } from '../../shared/components/VideoHero'
import { OurBrand } from '../../shared/components/OurBrand'
import { ChainValues } from '../../shared/components/ChainValues'
import { Section } from '../../shared/components/Section'
import { WhatsAppContact } from '../../shared/components/WhatsAppContact'
import { WhoWheAre } from '../../shared/components/WhoWheAre'
import ProductPage from '../product/ProductPage'

export default function HomePage() {
  return (
    <>
      <VideoHero />

      <WhoWheAre />
      <OurBrand />

      <ChainValues />

      <ProductPage/>

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

      <Section id="contacto" title=" ">
        <WhatsAppContact />
      </Section>

      {/* <WhatsAppFAB /> */}
    </>
  )
}
