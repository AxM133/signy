import { useEffect, type RefObject } from 'react'

export const useOutsideClick = (ref: RefObject<HTMLElement | null>, handler: () => void, active = true) => {
  useEffect(() => {
    if (!active) return
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler()
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handler()
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, handler, active])
}
