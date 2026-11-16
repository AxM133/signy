import { cn } from '@/shared/lib/cn'

interface PlayButtonProps {
  onClick?: () => void
  label?: string
  className?: string
}

/** Белая круглая кнопка Play с пульсирующим ореолом. Размер — через className. */
export const PlayButton = ({ onClick, label = 'Смотреть видео', className }: PlayButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={cn(
      'group/play relative flex size-[102px] cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_10px_40px_-10px_rgba(6,18,36,0.5)]',
      'transition-transform duration-300 hover:scale-110 active:scale-95',
      className,
    )}
  >
    <span className="absolute inset-0 rounded-full bg-white/60 motion-safe:animate-ping [animation-duration:2.4s]" aria-hidden="true" />
    <svg viewBox="0 0 24 24" className="relative size-[34%] translate-x-[8%] fill-brand" aria-hidden="true">
      <path d="M5 2.5v19a1 1 0 0 0 1.5.86l16-9.5a1 1 0 0 0 0-1.72l-16-9.5A1 1 0 0 0 5 2.5Z" />
    </svg>
  </button>
)
