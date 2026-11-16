import { cn } from '@/shared/lib/cn'

export type ButtonVariant = 'primary' | 'outline' | 'outline-light' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white shadow-[0_6px_18px_-6px_rgba(16,100,229,0.7)] hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(16,100,229,0.85)]',
  outline: 'border border-brand text-ink hover:bg-brand hover:text-white',
  'outline-light': 'border border-white/80 text-white hover:bg-white hover:text-slate-blue',
  ghost: 'text-ink hover:text-brand',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-6 text-[12px]',
  md: 'h-11 px-7 text-[13px]',
  lg: 'h-14 px-8 text-[14px]',
}

export const buttonClasses = (variant: ButtonVariant, size: ButtonSize, pending?: boolean, className?: string) =>
  cn(
    'relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold tracking-[0.12em] whitespace-nowrap uppercase',
    'transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-100',
    variants[variant],
    sizes[size],
    pending && 'pointer-events-none bg-[#6fa3f0] shadow-none',
    className,
  )

