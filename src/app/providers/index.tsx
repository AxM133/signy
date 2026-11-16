import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { DemoModalProvider } from '@/features/demo-request'
import { QueryProvider } from './QueryProvider'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  // reducedMotion="user" — уважаем системную настройку «уменьшить движение»
  <MotionConfig reducedMotion="user">
    <QueryProvider>
      <DemoModalProvider>{children}</DemoModalProvider>
    </QueryProvider>
  </MotionConfig>
)
