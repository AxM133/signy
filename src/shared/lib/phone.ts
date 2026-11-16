/**
 * Украинский номер: +38 0XX XXX XX XX (код страны + 10 цифр национального номера).
 * Поле ввода принимает только цифры и само расставляет пробелы; лишние цифры отбрасываются.
 */
const NATIONAL_LENGTH = 10

export const countDigits = (value: string) => (value.match(/\d/g) ?? []).length

const nationalPart = (digits: string) => (digits.startsWith('38') ? digits.slice(2) : digits)

/** Сколько цифр отбросит форматирование (они всегда с правого края). */
export const droppedDigits = (raw: string): number => {
  const digits = raw.replace(/\D/g, '')
  return digits === '3' ? 0 : Math.max(0, nationalPart(digits).length - NATIONAL_LENGTH)
}

/** Любой ввод (в том числе вставленный) → отформатированная строка `+38 050 123 45 67`. */
export const formatPhoneInput = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')
  if (digits === '') return ''
  if (digits === '3') return '+3' // пользователь печатает код страны
  const national = nationalPart(digits).slice(0, NATIONAL_LENGTH)
  const groups = [national.slice(0, 3), national.slice(3, 6), national.slice(6, 8), national.slice(8, 10)].filter(Boolean)
  return ['+38', ...groups].join(' ')
}

/** Приводит номер к виду `+380501234567`; если это не украинский номер — `null`. */
export const toE164 = (value: string): string | null => {
  const digits = value.replace(/\D/g, '')
  if (/^380\d{9}$/.test(digits)) return `+${digits}`
  if (/^0\d{9}$/.test(digits)) return `+38${digits}`
  return null
}

/**
 * Позиция курсора после форматирования: сохраняем число цифр справа от курсора,
 * поэтому правка в середине номера не «прыгает» в конец.
 */
export const caretAfterFormat = (formatted: string, digitsToTheRight: number): number => {
  let count = 0
  for (let i = formatted.length; i > 0; i--) {
    if (count === digitsToTheRight) return i
    if (/\d/.test(formatted[i - 1])) count++
  }
  return 0
}
