import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { formatNumber } from '@/shared/lib/format'

interface CountUpProps {
  to: number
  duration?: number
  className?: string
}

export const CountUp = ({ to, duration = 2.4, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration])

  return (
    <span ref={ref} className={className} aria-label={formatNumber(to)}>
      <span aria-hidden="true" className="tabular-nums">
        {formatNumber(value)}
      </span>
    </span>
  )
}
