import { useFaq, useSingleOpen } from '@/entities/faq'

export const usePopularFaq = () => {
  const query = useFaq()
  const group = query.data?.find((g) => g.popular)
  const accordion = useSingleOpen('p2')
  return { ...query, questions: group?.questions ?? [], ...accordion }
}
