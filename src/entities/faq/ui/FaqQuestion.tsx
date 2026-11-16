import { useId } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/shared/lib/cn'
import type { FaqQuestion as FaqQuestionType } from '../model/schema'

interface FaqQuestionProps {
  item: FaqQuestionType
  open: boolean
  onToggle: () => void
  className?: string
}

/** Вопрос-ответ: «+» превращается в «–», ответ раскрывается плавно. */
export const FaqQuestion = ({ item, open, onToggle, className }: FaqQuestionProps) => {
  const panelId = useId()
  return (
    <li className={cn('group', className)}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-start gap-4 py-1.5 text-left"
        >
          <span
            aria-hidden="true"
            className={cn(
              'relative mt-[7px] block size-3.5 shrink-0 text-brand transition-transform duration-300',
              open && 'rotate-180',
            )}
          >
            <span className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 rounded bg-current" />
            <span
              className={cn(
                'absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 rounded bg-current transition-transform duration-300',
                open && 'scale-y-0',
              )}
            />
          </span>
          <span
            className={cn(
              'text-[17px] leading-[22px] text-ink transition-colors duration-200 group-hover:text-brand',
              open && 'font-medium',
            )}
          >
            {item.question}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-3 pl-[30px] text-[17px] leading-[22px] text-ink/90">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
