import { useId, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useDialogFocus } from '@/shared/lib/useDialogFocus'
import { useLockBodyScroll } from '@/shared/lib/useLockBodyScroll'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const ModalPanel = ({ onClose, title, children }: Omit<ModalProps, 'open'>) => {
  const titleId = useId()
  const ref = useDialogFocus<HTMLDivElement>(true, onClose)
  useLockBodyScroll(true)

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0 bg-[#283447]/75 backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative my-auto w-full max-w-[555px] rounded-[4px] bg-sky px-6 pt-8 pb-10 shadow-[0_30px_80px_-20px_rgba(6,18,36,0.6)] outline-none sm:px-14"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-6 right-6 cursor-pointer text-brand transition-transform duration-300 hover:rotate-90 sm:top-7 sm:right-8"
        >
          <X className="size-8" strokeWidth={1.5} />
        </button>
        <h2 id={titleId} className="h-display text-center text-[28px] text-night">
          {title}
        </h2>
        {children}
      </motion.div>
    </motion.div>
  )
}

export const Modal = ({ open, onClose, title, children }: ModalProps) =>
  createPortal(
    <AnimatePresence>
      {open && (
        <ModalPanel onClose={onClose} title={title}>
          {children}
        </ModalPanel>
      )}
    </AnimatePresence>,
    document.body,
  )
