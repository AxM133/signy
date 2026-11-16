import { PartnersCarousel } from '@/widgets/partners-carousel'
import { SubscribeSection } from '@/widgets/subscribe-section'
import { BenefitsSection } from '../sections/benefits'
import { ComfortSection } from '../sections/comfort'
import { FaqPreviewSection } from '../sections/faq-preview'
import { HeroSection } from '../sections/hero'
import { NewsSection } from '../sections/news'
import { PricingSection } from '../sections/pricing'
import { StatsSection } from '../sections/stats'
import { VideoIntroSection } from '../sections/video-intro'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'

export const HomePage = () => {
  useDocumentTitle('Signy — цифровой документооборот в три этапа')
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ComfortSection />
      <PricingSection />
      <StatsSection />
      <PartnersCarousel />
      <NewsSection />
      <VideoIntroSection />
      <FaqPreviewSection />
      <SubscribeSection tone="white" />
    </>
  )
}
