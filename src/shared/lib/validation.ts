import { z } from 'zod'
import { toE164 } from './phone'
import { countLinks, multiLine, singleLine } from './sanitize'

/** Максимальные длины — те же значения ставятся в `maxLength` полей ввода. */
export const LIMITS = { name: 60, email: 120, phone: 25, message: 1500 } as const

/** Общие поля форм: одна точка правды для всех lead-форм сайта. */
export const nameField = z
  .string()
  .transform(singleLine)
  .pipe(
    z
      .string()
      .min(2, 'Введите имя — минимум 2 символа')
      .max(LIMITS.name, 'Слишком длинное имя')
      .regex(/^[\p{L}\p{M}\s'’.-]+$/u, 'Имя может содержать только буквы'),
  )

export const emailField = z
  .string()
  .transform(singleLine)
  .pipe(z.string().min(1, 'Введите электронную почту').max(LIMITS.email, 'Слишком длинный адрес').pipe(z.email('Проверьте адрес: например, ivan@mail.com')))

export const phoneField = z
  .string()
  .transform(singleLine)
  .pipe(
    z
      .string()
      .min(1, 'Введите телефон')
      .max(LIMITS.phone, 'Слишком длинный номер')
      .regex(/^\+?[\d\s()-]+$/, 'В номере допустимы только цифры')
      .refine((v) => toE164(v) !== null, 'Введите номер в формате +38 050 123 45 67')
      // на выходе — единый вид +380501234567
      .transform((v) => toE164(v) as string),
  )

/** Свободный текст: без невидимых символов, с лимитом длины и ссылок (типичный признак спама). */
export const messageField = z
  .string()
  .transform(multiLine)
  .pipe(
    z
      .string()
      .max(LIMITS.message, `Сообщение слишком длинное — до ${LIMITS.message} символов`)
      .refine((v) => countLinks(v) <= 2, 'Слишком много ссылок в сообщении'),
  )
