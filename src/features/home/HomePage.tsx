// src/features/home/HomePage.tsx
import { VideoHero } from '../../shared/components/VideoHero'
import { OurBrand } from '../../shared/components/OurBrand'
import { ChainValues } from '../../shared/components/ChainValues'
import StatsSection from '../../shared/components/StatsSection'
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

      <StatsSection />

      <ProductPage />

      <EnvImpact />

      <WhatsAppContact />
    </>
  )
}
