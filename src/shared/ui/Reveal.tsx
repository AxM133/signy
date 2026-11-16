import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
}

/** Появление блока при скролле. `prefers-reduced-motion` учитывается через MotionConfig в провайдерах. */
export const Reveal = ({ children, className, delay = 0, y = 28, x = 0 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)
