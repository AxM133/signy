import { PageHead, Reveal } from '@/shared/ui'
import { introContent } from '../model/content'

export const IntroSection = () => (
  <section aria-labelledby="about-title">
    <PageHead crumbs={[{ label: 'Про нас' }]} title={<span id="about-title">{introContent.title}</span>} />
    <div className="container-page">
      <Reveal className="mt-6 overflow-hidden rounded-[4px] lg:mt-8" y={20}>
        <img
          src={introContent.image}
          alt={introContent.imageAlt}
          width={1232}
          height={422}
          fetchPriority="high"
          className="aspect-[1232/422] w-full object-cover max-md:aspect-[4/3] md:hover:scale-[1.02] md:transition-transform md:duration-[1200ms]"
        />
      </Reveal>
      <div className="mt-8 flex max-w-[1232px] flex-col gap-6 text-[17px] leading-[26px] text-ink lg:mt-9">
        {introContent.paragraphs.map((p, i) => (
          <Reveal key={i} y={14}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
