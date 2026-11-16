import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

/**
 * Скролл при навигации:
 *  - к якорю (`/#pricing`) — плавно, при каждом переходе по ссылке (даже повторном);
 *  - на другую страницу — наверх;
 *  - смена только query/replace на той же странице (например, фильтр блога) — позицию не трогаем.
 * Страницы грузятся лениво, поэтому якорь ищем с небольшими повторами.
 */
export const useScrollManager = () => {
  const { pathname, hash, key } = useLocation()
  const navType = useNavigationType()
  const navTypeRef = useRef(navType)
  const prevPathRef = useRef(pathname)

  useEffect(() => {
    navTypeRef.current = navType
  })

  useEffect(() => {
    const pathChanged = prevPathRef.current !== pathname
    prevPathRef.current = pathname

    if (!hash) {
      if (pathChanged && navTypeRef.current !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const timer = window.setInterval(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.clearInterval(timer)
      } else if (++tries > 25) {
        window.clearInterval(timer)
      }
    }, 80)
    return () => window.clearInterval(timer)
  }, [pathname, hash, key])
}
