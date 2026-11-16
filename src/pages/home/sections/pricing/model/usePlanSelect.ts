import { useDemoModal } from '@/features/demo-request'
import type { Plan } from '@/entities/plan'

/** Выбор тарифа открывает форму заявки и помечает источник заявки. */
export const usePlanSelect = () => {
  const demo = useDemoModal()
  return (plan: Plan) => demo.open(`plan:${plan.id}`)
}
