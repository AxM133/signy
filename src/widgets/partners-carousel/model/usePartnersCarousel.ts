import { useEffect, useMemo, useState } from 'react'
import { partners, type Partner } from '@/entities/partner'

export const PAGES = 3

/** Страница карусели — те же логотипы, сдвинутые по кругу (в макете 3 точки-страницы). */
const rotate = (list: Partner[], by: number) => list.map((_, i) => list[(i + by) % list.length])

export const usePartnersCarousel = (intervalMs = 4500) => {
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setPage((p) => (p + 1) % PAGES), intervalMs)
    return () => window.clearInterval(id)
  }, [paused, intervalMs])

  const items = useMemo(() => rotate(partners, page), [page])

  return { page, setPage, items, pause: () => setPaused(true), resume: () => setPaused(false) }
}
