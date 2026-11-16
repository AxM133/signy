import { signature } from '@/shared/assets/images'
import { Reveal } from '@/shared/ui'
import { outroContent } from '../model/content'

export const OutroSection = () => (
  <section aria-label="Подпись" className="container-page pb-12 lg:pb-14">
    <div className="flex flex-col gap-6 text-[17px] leading-[26px] text-ink">
      {outroContent.paragraphs.map((p, i) => (
        <Reveal key={i} y={14}>
          <p>{p}</p>
        </Reveal>
      ))}
    </div>
    <Reveal className="mt-6 flex justify-center">
      <img src={signature} alt="Подпись" width={243} height={58} loading="lazy" className="h-auto w-[243px]" />
    </Reveal>
  </section>
)
