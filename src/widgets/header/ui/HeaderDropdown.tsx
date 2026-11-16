import { useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { useOutsideClick } from '@/shared/lib/useOutsideClick'

interface HeaderDropdownProps {
  label: ReactNode
  children: (close: () => void) => ReactNode
  align?: 'left' | 'right'
  className?: string
}

export const HeaderDropdown = ({ label, children, align = 'left', className }: HeaderDropdownProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const close = () => setOpen(false)
  useOutsideClick(ref, close, open)

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="nav-label flex cursor-pointer items-center gap-1 py-2 text-night transition-colors hover:text-brand"
      >
        {label}
        <ChevronDown className={cn('size-4 transition-transform duration-300', open && 'rotate-180')} strokeWidth={2.2} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'absolute top-full z-50 mt-2 min-w-[210px] origin-top rounded-xl border border-sky-deep/60 bg-white p-2 shadow-[0_20px_40px_-16px_rgba(6,18,36,0.35)]',
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            {children(close)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const dropdownItemClass =
  'nav-label block w-full cursor-pointer rounded-lg px-4 py-2.5 text-left text-[12px] text-night transition-colors hover:bg-sky hover:text-brand'
