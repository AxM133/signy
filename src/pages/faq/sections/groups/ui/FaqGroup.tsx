import { useId } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FaqQuestion, type FaqGroup as FaqGroupType } from '@/entities/faq'
import { cn } from '@/shared/lib/cn'
import { answersLabel, useGroupQuestions } from '../model/useGroupQuestions'

interface FaqGroupProps {
  group: FaqGroupType
  open: boolean
  onToggle: () => void
}

export const FaqGroup = ({ group, open, onToggle }: FaqGroupProps) => {
  const panelId = useId()
  const { openId, toggle } = useGroupQuestions(Boolean(group.popular))

  return (
    <section className="group/g">
      <h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex cursor-pointer flex-col items-start gap-2 text-left"
        >
          <span className="flex items-baseline gap-2 text-[22px] leading-7 font-medium text-night transition-colors group-hover/g:text-brand">
            {group.title}
            <span aria-hidden="true" className={cn('text-[26px] leading-none font-normal text-brand transition-transform duration-300', open && 'rotate-180')}>
              {open ? '–' : '+'}
            </span>
          </span>
          {!group.popular && (
            <span className="text-[17px] text-ink transition-colors group-hover/g:text-brand">{answersLabel(group.questions.length)}</span>
          )}
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="flex max-w-[560px] flex-col gap-2 pt-5 pb-1">
              {group.questions.map((q) => (
                <FaqQuestion key={q.id} item={q} open={openId === q.id} onToggle={() => toggle(q.id)} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
