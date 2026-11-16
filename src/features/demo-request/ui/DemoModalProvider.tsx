import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { DemoModalContext } from '../model/demoModalContext'
import { DemoRequestModal } from './DemoRequestModal'

/** Один глобальный экземпляр окна «Демо версия» — открывается из шапки, героя, тарифов и т.д. */
export const DemoModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [source, setSource] = useState<string>()

  const openModal = useCallback((src?: string) => {
    setSource(src)
    setSent(false)
    setOpen(true)
  }, [])

  const value = useMemo(() => ({ open: openModal }), [openModal])

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <DemoRequestModal open={open} sent={sent} source={source} onSent={() => setSent(true)} onClose={() => setOpen(false)} />
    </DemoModalContext.Provider>
  )
}
