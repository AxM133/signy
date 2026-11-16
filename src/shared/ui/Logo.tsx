import { cn } from '@/shared/lib/cn'

interface LogoProps {
  variant?: 'color' | 'light'
  className?: string
}

export const LogoMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={cn('size-10', className)} aria-hidden="true">
    <rect width="48" height="48" rx="11" fill="#1064e5" />
    <circle
      cx="24"
      cy="24"
      r="12.5"
      fill="none"
      stroke="#fff"
      strokeWidth="4.5"
      strokeDasharray="64 20"
      strokeDashoffset="-8"
      strokeLinecap="round"
    />
    <path
      d="M18 24.5l4.5 4.5L33 17.5"
      fill="none"
      stroke="#fff"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Logo = ({ variant = 'color', className }: LogoProps) => (
  <span className={cn('group inline-flex items-center gap-2.5', className)}>
    <LogoMark className="transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105" />
    <span
      className={cn(
        'font-logo text-[30px] leading-none font-semibold tracking-tight',
        variant === 'light' ? 'text-white' : 'text-night',
      )}
    >
      Signy
    </span>
  </span>
)
