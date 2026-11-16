/**
 * Невидимые и управляющие символы, которыми прячут спам, ломают вёрстку или подделывают текст:
 * управляющие ASCII, zero-width, направление текста (bidi override), BOM.
 */
// eslint-disable-next-line no-control-regex
const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g

/** Убирает невидимые символы и схлопывает повторные пробелы в однострочных полях. */
export const stripInvisible = (value: string) => value.replace(INVISIBLE, '')

export const singleLine = (value: string) => stripInvisible(value).replace(/\s+/g, ' ').trim()

/** Многострочный текст: чистим символы, ограничиваем серии пустых строк. */
export const multiLine = (value: string) =>
  stripInvisible(value).replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim()

export const countLinks = (value: string) => (value.match(/(?:https?:\/\/|www\.)/gi) ?? []).length
