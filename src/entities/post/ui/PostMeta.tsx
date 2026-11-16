import { formatDate } from '@/shared/lib/format'

export const PostDate = ({ date, className }: { date: string; className?: string }) => (
  <time dateTime={date} className={className ?? 'text-[14px] text-ink'}>
    {formatDate(date)}
  </time>
)
