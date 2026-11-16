import { createContext } from 'react'

export interface DemoModalContextValue {
  /** Открыть окно «Демо версия». `source` пишется в заявку. */
  open: (source?: string) => void
}

export const DemoModalContext = createContext<DemoModalContextValue | null>(null)
