import { cn } from '@/shared/lib/cn'

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-md bg-slate-200/70', className)} aria-hidden="true" />
)
