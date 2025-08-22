// src/features/home/HomePage.tsx
import { VideoHero } from '../../shared/components/VideoHero'
import { OurBrand } from '../../shared/components/OurBrand'
import { ChainValues } from '../../shared/components/ChainValues'
import { Section } from '../../shared/components/Section'
import { WhatsAppContact } from '../../shared/components/WhatsAppContact'
import { WhoWheAre } from '../../shared/components/WhoWheAre'
import { EnvImpact } from '../../shared/components/EnvImpact'
import ProductPage from '../product/ProductPage'

export default function HomePage() {
  return (
    <>
      <VideoHero />

      <WhoWheAre />
      
      <OurBrand />

      <ChainValues />

      <ProductPage />

      <EnvImpact />

      <WhatsAppContact />
    </>
  )
}
