import { Reveal, Skeleton } from '@/shared/ui'
import { useFaqGroups } from '../model/useFaqGroups'
import { FaqGroup } from './FaqGroup'

export const GroupsSection = () => {
  const { groups, openGroupId, toggleGroup, isPending, isError, refetch } = useFaqGroups()

  return (
    <div className="container-page pt-8 pb-14 lg:pb-16">
      {isPending && (
        <div className="flex flex-col gap-8" aria-busy="true">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="h-14 w-72" />
          ))}
        </div>
      )}
      {isError && (
        <p role="alert" className="text-[17px] text-ink">
          Не удалось загрузить вопросы.{' '}
          <button type="button" onClick={() => refetch()} className="cursor-pointer text-brand underline">
            Повторить
          </button>
        </p>
      )}
      <div className="flex flex-col gap-7">
        {groups.map((group, i) => (
          <Reveal key={group.id} delay={Math.min(i, 3) * 0.05} y={16}>
            <FaqGroup group={group} open={openGroupId === group.id} onToggle={() => toggleGroup(group.id)} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
