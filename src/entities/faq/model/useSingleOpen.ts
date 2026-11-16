import { useCallback, useState } from 'react'

/** Аккордеон «один открыт за раз». `null` — всё закрыто. */
export const useSingleOpen = (initial: string | null = null) => {
  const [openId, setOpenId] = useState<string | null>(initial)
  const toggle = useCallback((id: string) => setOpenId((current) => (current === id ? null : id)), [])
  return { openId, toggle }
}
