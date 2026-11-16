import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui'
import type { Plan } from '../model/plans'

interface PlanCardProps {
  plan: Plan
  onSelect: (plan: Plan) => void
}

export const PlanCard = ({ plan, onSelect }: PlanCardProps) => (
  <article
    className={cn(
      'group relative flex h-full flex-col rounded-[4px] bg-sky px-8 pt-9 pb-8 transition-all duration-500',
      'hover:-translate-y-2 hover:bg-white hover:shadow-[0_24px_50px_-18px_rgba(16,100,229,0.45)] hover:ring-1 hover:ring-brand/25',
    )}
  >
    <h3 className="text-[28px] leading-tight font-medium text-ink">{plan.name}</h3>
    <p className="mt-9 min-h-[44px] text-[17px] leading-[22px] text-ink">{plan.documents}</p>
    <div className="mt-auto pt-3">
      {plan.price !== null && (
        <p className="flex flex-wrap items-baseline gap-x-1.5 whitespace-nowrap">
          <span className="text-[48px] leading-none font-medium tracking-tight text-ink">{plan.price}</span>
          <span className="text-[19px] text-ink">{plan.period}</span>
        </p>
      )}
    </div>
    <Button size="sm" className="mt-10 w-full" onClick={() => onSelect(plan)}>
      {plan.ctaLabel}
    </Button>
  </article>
)
