import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

/**
 * Меню помнит, на какой «записи истории» его открыли (`location.key`):
 * любая навигация меняет ключ, и меню закрывается само, без эффектов.
 */
export const useMobileMenu = () => {
  const { key } = useLocation()
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const open = openedAt === key

  const close = useCallback(() => setOpenedAt(null), [])
  const toggle = useCallback(() => setOpenedAt(open ? null : key), [open, key])

  // Если окно расширили до десктопа — прячем мобильное меню
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpenedAt(null)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return { open, close, toggle }
}
