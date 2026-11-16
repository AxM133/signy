import { Reveal } from '@/shared/ui'
import { quoteContent } from '../model/content'

export const QuoteSection = () => (
  <section aria-label="Отзыв и история" className="container-page">
    <div className="mt-10 grid items-center gap-8 md:grid-cols-[531px_1fr] md:gap-[110px] lg:mt-12 lg:pl-[86px]">
      <Reveal x={-24} y={0}>
        <img
          src={quoteContent.image}
          alt={quoteContent.imageAlt}
          width={531}
          height={405}
          loading="lazy"
          className="aspect-[531/405] w-full rounded-[4px] object-cover"
        />
      </Reveal>
      <Reveal x={24} y={0} delay={0.1}>
        <figure className="max-w-[400px]">
          <blockquote className="text-[17px] leading-[26px] text-ink">{quoteContent.text}</blockquote>
          <figcaption className="mt-9 text-right text-[17px] leading-[26px] text-ink md:pr-1">
            <span className="block font-medium">{quoteContent.author.name}</span>
            <span className="block">{quoteContent.author.position}</span>
            <span className="block">{quoteContent.author.company}</span>
          </figcaption>
        </figure>
      </Reveal>
    </div>
    <div className="mt-12 flex flex-col gap-6 text-[17px] leading-[26px] text-ink">
      {quoteContent.paragraphs.map((p, i) => (
        <Reveal key={i} y={14}>
          <p>{p}</p>
        </Reveal>
      ))}
    </div>
  </section>
)
