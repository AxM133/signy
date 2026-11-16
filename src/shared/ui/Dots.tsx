import { cn } from '@/shared/lib/cn'

interface DotsProps {
  count: number
  active: number
  onSelect: (index: number) => void
  label?: string
  className?: string
}

export const Dots = ({ count, active, onSelect, label = 'Слайд', className }: DotsProps) => (
  <div className={cn('flex items-center justify-center gap-5', className)} role="tablist">
    {Array.from({ length: count }, (_, i) => (
      <button
        key={i}
        type="button"
        role="tab"
        aria-selected={i === active}
        aria-label={`${label} ${i + 1}`}
        onClick={() => onSelect(i)}
        className="group flex size-5 cursor-pointer items-center justify-center"
      >
        <span
          className={cn(
            'block size-[10px] rounded-full border-2 border-brand transition-all duration-300',
            i === active ? 'scale-100 bg-brand' : 'bg-transparent group-hover:scale-125 group-hover:bg-brand/30',
          )}
        />
      </button>
    ))}
  </div>
)
