import { useFaq, useSingleOpen } from '@/entities/faq'

export const useFaqGroups = () => {
  const query = useFaq()
  const groups = useSingleOpen('popular')
  return { ...query, groups: query.data ?? [], openGroupId: groups.openId, toggleGroup: groups.toggle }
}
