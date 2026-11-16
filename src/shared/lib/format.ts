/** ISO `2020-05-28` → `28.05.2020` (без привязки к часовому поясу). */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

/** 5820125114 → «5 820 125 114» (обычные пробелы, чтобы текст переносился предсказуемо). */
export const formatNumber = (n: number) => new Intl.NumberFormat('ru-RU').format(n).replace(/\s/g, ' ')
