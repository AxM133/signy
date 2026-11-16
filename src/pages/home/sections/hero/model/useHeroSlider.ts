import { useCallback, useEffect, useState } from 'react'

export const useHeroSlider = (count: number, intervalMs = 6500) => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])

  // Таймер перезапускается при любой смене слайда — ручное переключение не «съедается» автопереходом
  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), intervalMs)
    return () => window.clearTimeout(id)
  }, [index, paused, count, intervalMs])

  return { index, goTo, setPaused }
}
