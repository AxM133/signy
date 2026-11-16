import { cn } from '@/shared/lib/cn'

/** Летящий конверт из модальных окон «Спасибо» / «Демо версия». */
export const EnvelopeIllustration = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 240 160" className={cn('mx-auto h-auto w-56', className)} fill="none" aria-hidden="true">
    <g stroke="#1064e5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="animate-fly">
      <g transform="rotate(-14 130 80)">
        <path d="M70 38 L192 38 L192 118 L70 118 Z" />
        <path d="M70 38 L131 84 L192 38" />
        <path d="M70 118 L112 72" />
        <path d="M192 118 L150 72" />
      </g>
    </g>
    <g stroke="#1064e5" strokeWidth="5" strokeLinecap="round">
      <path d="M8 58 L36 52" className="animate-twinkle" />
      <path d="M2 82 L44 74" className="animate-twinkle [animation-delay:.4s]" />
      <path d="M26 100 L50 94" className="animate-twinkle [animation-delay:.8s]" />
      <path d="M14 122 L38 116" className="animate-twinkle [animation-delay:1.2s]" />
    </g>
  </svg>
)
