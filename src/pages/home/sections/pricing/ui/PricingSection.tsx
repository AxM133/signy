import { PlanCard, plans } from '@/entities/plan'
import { Reveal, SectionTitle } from '@/shared/ui'
import { usePlanSelect } from '../model/usePlanSelect'

export const PricingSection = () => {
  const onSelect = usePlanSelect()
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-white">
      <div className="container-page py-14 lg:max-w-[1180px] lg:py-[72px]">
        <Reveal>
          <SectionTitle id="pricing-title">Пакеты цифровых подписей</SectionTitle>
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {plans.map((plan, i) => (
            <li key={plan.id}>
              <Reveal delay={i * 0.1} className="h-full">
                <PlanCard plan={plan} onSelect={onSelect} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
