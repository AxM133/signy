import { PartnersCarousel } from '@/widgets/partners-carousel'
import { SubscribeSection } from '@/widgets/subscribe-section'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { IntroSection } from '../sections/intro'
import { OutroSection } from '../sections/outro'
import { QuoteSection } from '../sections/quote'

export const AboutPage = () => {
  useDocumentTitle('Про нас — Signy')
  return (
    <>
      <IntroSection />
      <QuoteSection />
      <PartnersCarousel />
      <OutroSection />
      <SubscribeSection tone="mint" />
    </>
  )
}
