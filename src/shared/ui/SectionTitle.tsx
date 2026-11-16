import type { ElementType, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

interface SectionTitleProps {
  children: ReactNode
  as?: ElementType
  className?: string
  center?: boolean
  id?: string
}

export const SectionTitle = ({ children, as: Tag = 'h2', className, center = true, id }: SectionTitleProps) => (
  <Tag id={id} className={cn('h-display text-[28px] text-night sm:text-[34px] lg:text-[40px]', center && 'text-center', className)}>
    {children}
  </Tag>
)

export const PageTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h1 className={cn('h-display text-[28px] text-night sm:text-[34px] lg:text-[40px]', className)}>{children}</h1>
)
