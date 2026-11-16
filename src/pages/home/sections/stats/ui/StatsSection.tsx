import { CountUp, Reveal } from '@/shared/ui'
import { signedDocuments, statsCopy } from '../model/stats'

export const StatsSection = () => (
  <section aria-label="Статистика" className="relative overflow-hidden bg-mint">
    <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-white/50 blur-3xl" aria-hidden="true" />
    <div className="pointer-events-none absolute -right-20 -bottom-24 size-80 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
    <Reveal className="container-page relative py-12 text-center lg:py-[50px]">
      <p className="text-[44px] leading-none font-medium tracking-tight text-night sm:text-[64px] lg:text-[72px]">
        <CountUp to={signedDocuments} />
      </p>
      <p className="h-display mt-3 text-[26px] text-night sm:text-[34px] lg:text-[40px]">подписано документов</p>
      <p className="mx-auto mt-5 max-w-[460px] text-[17px] leading-7 text-ink">{statsCopy}</p>
    </Reveal>
  </section>
)
