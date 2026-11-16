import { paths } from '@/shared/config/routes'
import { Button, Reveal, SectionTitle } from '@/shared/ui'
import { useDemoModal } from '@/features/demo-request'
import { comfortContent, productContent } from '../model/content'
import { FeatureList } from './FeatureList'
import { Screenshot } from './Screenshot'

export const ComfortSection = () => {
  const demo = useDemoModal()
  return (
    <section aria-label="О сервисе" className="overflow-hidden bg-mint">
      <div className="container-page flex flex-col gap-14 py-14 lg:gap-[72px] lg:py-[80px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_596px] lg:gap-[100px]">
          <Reveal x={-30} y={0}>
            <SectionTitle center={false}>{comfortContent.title}</SectionTitle>
            <div className="mt-7">
              <FeatureList items={comfortContent.items} />
            </div>
            <Button to={paths.about} variant="outline" size="lg" className="mt-8">
              {comfortContent.cta}
            </Button>
          </Reveal>
          <Reveal x={30} y={0} delay={0.1}>
            <Screenshot />
          </Reveal>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[596px_1fr] lg:gap-[100px]">
          <Reveal x={-30} y={0} className="max-lg:order-2">
            <Screenshot />
          </Reveal>
          <Reveal x={30} y={0} delay={0.1} className="max-lg:order-1">
            <SectionTitle center={false}>{productContent.title}</SectionTitle>
            <div className="mt-7">
              <FeatureList items={productContent.items} />
            </div>
            <Button size="lg" className="mt-8" onClick={() => demo.open('product')}>
              {productContent.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
