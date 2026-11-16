import { Skeleton } from '@/shared/ui'

export const ArticleSkeleton = () => (
  <div className="container-page mt-6 flex flex-col gap-4" aria-busy="true">
    <Skeleton className="h-8 w-72" />
    {Array.from({ length: 8 }, (_, i) => (
      <Skeleton key={i} className="h-5 w-full max-w-[580px]" />
    ))}
  </div>
)
