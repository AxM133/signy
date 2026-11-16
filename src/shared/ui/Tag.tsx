import { cn } from '@/shared/lib/cn'

export const Tag = ({ children, className }: { children: string; className?: string }) => (
  <span
    className={cn(
      'inline-flex h-6 items-center rounded-full bg-[#e3e5e9] px-3.5 text-[11px] font-medium tracking-[0.1em] text-ink uppercase',
      className,
    )}
  >
    {children}
  </span>
)

export const TagList = ({ tags, className }: { tags: readonly string[]; className?: string }) => (
  <ul className={cn('flex flex-wrap gap-3', className)} aria-label="Теги">
    {tags.map((t) => (
      <li key={t}>
        <Tag>{t}</Tag>
      </li>
    ))}
  </ul>
)
