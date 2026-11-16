import { useContext } from 'react'
import { DemoModalContext } from './demoModalContext'

export const useDemoModal = () => {
  const ctx = useContext(DemoModalContext)
  if (!ctx) throw new Error('useDemoModal должен использоваться внутри <DemoModalProvider>')
  return ctx
}
