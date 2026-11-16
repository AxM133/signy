import { Reveal } from '@/shared/ui'
import { benefits } from '../model/benefits'

export const BenefitsSection = () => (
  <section aria-label="Преимущества" className="bg-white">
    <ul className="container-page grid gap-8 py-10 sm:grid-cols-3 sm:gap-6 lg:max-w-[1080px] lg:py-[58px]">
      {benefits.map(({ title, lines, Icon }, i) => (
        <li key={title}>
          <Reveal delay={i * 0.12} className="group flex items-start gap-5">
            <span className="flex size-[68px] shrink-0 items-center justify-center rounded-2xl text-brand transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-sky">
              <Icon className="size-[52px]" strokeWidth={1.3} />
            </span>
            <div>
              <h3 className="text-[24px] leading-8 font-medium text-night">{title}</h3>
              <p className="mt-2 text-[17px] leading-[22px] text-ink">
                {lines.map((l, idx) => (
                  <span key={l} className="block">
                    {l}
                    {idx === 0 && ''}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  </section>
)
