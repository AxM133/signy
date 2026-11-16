/** Разрешаем только http(s): `javascript:`, `data:text/html`, `vbscript:` и прочее отсекаются. */
export const isSafeHttpUrl = (value: string): boolean => {
  try {
    const { protocol } = new URL(value)
    return protocol === 'https:' || protocol === 'http:'
  } catch {
    return false
  }
}

/** Возвращает URL, если он безопасен, иначе — запасное значение. */
export const safeExternalHref = (value: string, fallback = '#'): string => (isSafeHttpUrl(value) ? value : fallback)

/**
 * Адрес картинки из данных: путь своего сайта, https-ссылка или встроенный растровый data-URI.
 * (Vite встраивает мелкие картинки как `data:image/png;base64,…`.)
 */
export const isSafeImageSrc = (value: string): boolean => {
  if (/^data:image\/(png|jpe?g|webp|gif|avif);base64,[a-z0-9+/=]+$/i.test(value)) return true
  if (value.startsWith('/') && !value.startsWith('//')) return true
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

/** Slug из адресной строки: только латиница, цифры и дефис. */
export const isValidSlug = (value: string): boolean => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 100
