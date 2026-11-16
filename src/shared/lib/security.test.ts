import { describe, expect, it } from 'vitest'
import { emailField, messageField, nameField, phoneField } from './validation'
import { caretAfterFormat, countDigits, droppedDigits, formatPhoneInput, toE164 } from './phone'
import { checkRateLimit, recordAttempt, type KeyValueStore } from './rateLimit'
import { isSafeHttpUrl, isSafeImageSrc, isValidSlug, safeExternalHref } from './safeUrl'
import { countLinks, multiLine, singleLine, stripInvisible } from './sanitize'

const memoryStore = (): KeyValueStore => {
  const m = new Map<string, string>()
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => void m.set(k, v) }
}

describe('sanitize', () => {
  it('убирает zero-width и bidi-символы', () => {
    expect(stripInvisible('Iv​an‮!')).toBe('Ivan!')
  })
  it('убирает управляющие символы (null byte, ESC)', () => {
    expect(stripInvisible('a\u0000b\u001Bc')).toBe('abc')
  })
  it('singleLine схлопывает пробелы и переносы', () => {
    expect(singleLine('  Иван \n  Петров ')).toBe('Иван Петров')
  })
  it('multiLine ограничивает серии пустых строк', () => {
    expect(multiLine('a\n\n\n\n\nb')).toBe('a\n\nb')
  })
  it('countLinks считает http(s) и www', () => {
    expect(countLinks('http://a.io, https://b.io и www.c.io')).toBe(3)
  })
})

describe('поля форм', () => {
  it('имя: отклоняет HTML и скрипты', () => {
    expect(nameField.safeParse('<script>alert(1)</script>').success).toBe(false)
    expect(nameField.safeParse('Анна-Мария').success).toBe(true)
  })
  it('имя: невидимые символы не помогают обойти минимальную длину', () => {
    expect(nameField.safeParse('​​​A').success).toBe(false)
  })
  it('email: валидный проходит, мусор нет', () => {
    expect(emailField.safeParse('ivan@mail.com').success).toBe(true)
    expect(emailField.safeParse('ivan@mail').success).toBe(false)
    expect(emailField.safeParse('a'.repeat(130) + '@mail.com').success).toBe(false)
  })
  it('телефон: только украинский номер, на выходе +380XXXXXXXXX', () => {
    expect(phoneField.parse('+38 050 123 45 67')).toBe('+380501234567')
    expect(phoneField.parse('0501234567')).toBe('+380501234567')
    expect(phoneField.parse('+38 (050) 123-45-67')).toBe('+380501234567')
    expect(phoneField.safeParse('12345').success).toBe(false)
    expect(phoneField.safeParse('+38050123456<b>').success).toBe(false)
    expect(phoneField.safeParse('+1 202 555 0123').success).toBe(false) // не украинский
    expect(phoneField.safeParse('+38 050 123 45 678').success).toBe(false) // лишняя цифра
    expect(phoneField.safeParse('050 abc 45 67').success).toBe(false) // буквы
    expect(phoneField.safeParse('1'.repeat(40)).success).toBe(false)
  })
  it('сообщение: лимит длины и ссылок', () => {
    expect(messageField.safeParse('x'.repeat(1501)).success).toBe(false)
    expect(messageField.safeParse('http://a.io http://b.io http://c.io').success).toBe(false)
    expect(messageField.safeParse('Здравствуйте! Нужна консультация.').success).toBe(true)
    expect(messageField.parse('  привет​  ')).toBe('привет')
  })
})

describe('rateLimit', () => {
  const rule = { max: 3, windowMs: 60_000 }
  it('разрешает max попыток, затем блокирует и сообщает время ожидания', () => {
    const store = memoryStore()
    const t0 = 1_000_000
    for (let i = 0; i < 3; i++) {
      expect(checkRateLimit('f', rule, t0 + i, store).allowed).toBe(true)
      recordAttempt('f', rule, t0 + i, store)
    }
    const blocked = checkRateLimit('f', rule, t0 + 10, store)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterMs).toBe(60_000 - 10)
  })
  it('после окна снова разрешает', () => {
    const store = memoryStore()
    for (let i = 0; i < 3; i++) recordAttempt('f', rule, 1000, store)
    expect(checkRateLimit('f', rule, 1000 + 60_001, store).allowed).toBe(true)
  })
  it('формы считаются независимо', () => {
    const store = memoryStore()
    for (let i = 0; i < 3; i++) recordAttempt('a', rule, 1000, store)
    expect(checkRateLimit('b', rule, 1001, store).allowed).toBe(true)
  })
  it('испорченное содержимое хранилища не ломает проверку', () => {
    const store = memoryStore()
    store.setItem('signy:rl:f', '{"not":"an array"}')
    expect(checkRateLimit('f', rule, 1, store).allowed).toBe(true)
    store.setItem('signy:rl:f', 'не json')
    expect(checkRateLimit('f', rule, 1, store).allowed).toBe(true)
  })
})

describe('safeUrl', () => {
  it('http(s) — безопасно, остальное — нет', () => {
    expect(isSafeHttpUrl('https://example.com/a')).toBe(true)
    expect(isSafeHttpUrl('javascript:alert(1)')).toBe(false)
    expect(isSafeHttpUrl('data:text/html,<script>alert(1)</script>')).toBe(false)
    expect(isSafeHttpUrl('vbscript:msgbox(1)')).toBe(false)
    expect(safeExternalHref('javascript:alert(1)', '#')).toBe('#')
  })
  it('картинки: свои пути, https и data:image — да; svg+xml, js и // — нет', () => {
    expect(isSafeImageSrc('/assets/a-123.webp')).toBe(true)
    expect(isSafeImageSrc('https://cdn.example.com/a.png')).toBe(true)
    expect(isSafeImageSrc('data:image/png;base64,iVBORw0KGgo=')).toBe(true)
    expect(isSafeImageSrc('data:image/svg+xml;base64,PHN2Zz4=')).toBe(false)
    expect(isSafeImageSrc('javascript:alert(1)')).toBe(false)
    expect(isSafeImageSrc('//evil.example/x.png')).toBe(false)
    expect(isSafeImageSrc('http://insecure.example/x.png')).toBe(false)
  })
  it('slug: только латиница, цифры, дефис', () => {
    expect(isValidSlug('vkhod-cherez-mobile-id')).toBe(true)
    expect(isValidSlug('../etc/passwd')).toBe(false)
    expect(isValidSlug('<img src=x>')).toBe(false)
    expect(isValidSlug('a'.repeat(101))).toBe(false)
    expect(isValidSlug('')).toBe(false)
  })
})

describe('маска телефона', () => {
  it('оставляет только цифры и расставляет пробелы', () => {
    expect(formatPhoneInput('0501234567')).toBe('+38 050 123 45 67')
    expect(formatPhoneInput('+380501234567')).toBe('+38 050 123 45 67')
    expect(formatPhoneInput('+38 (050) 123-45-67')).toBe('+38 050 123 45 67')
  })
  it('буквы и символы отбрасываются', () => {
    expect(formatPhoneInput('abc')).toBe('')
    expect(formatPhoneInput('0a5b0<script>')).toBe('+38 050')
    expect(formatPhoneInput('+-*/#')).toBe('')
  })
  it('больше 10 цифр национального номера не набрать', () => {
    expect(formatPhoneInput('0501234567890123')).toBe('+38 050 123 45 67')
    expect(countDigits(formatPhoneInput('9'.repeat(40)))).toBeLessThanOrEqual(12)
  })
  it('частичный ввод и код страны', () => {
    expect(formatPhoneInput('')).toBe('')
    expect(formatPhoneInput('3')).toBe('+3')
    expect(formatPhoneInput('38')).toBe('+38')
    expect(formatPhoneInput('0')).toBe('+38 0')
    expect(formatPhoneInput('05012')).toBe('+38 050 12')
  })
  it('toE164 принимает только 0XXXXXXXXX и 380XXXXXXXXX', () => {
    expect(toE164('050 123 45 67')).toBe('+380501234567')
    expect(toE164('+380501234567')).toBe('+380501234567')
    expect(toE164('501234567')).toBeNull()
    expect(toE164('')).toBeNull()
  })
  it('droppedDigits считает отброшенные цифры', () => {
    expect(droppedDigits('0501234567')).toBe(0)
    expect(droppedDigits('+38 050 91234567')).toBe(1)
    expect(droppedDigits('0501234567890123')).toBe(6)
    expect(droppedDigits('3')).toBe(0)
  })
  it('курсор сохраняет число цифр справа', () => {
    expect(caretAfterFormat('+38 050 123 45 67', 0)).toBe(17)
    expect(caretAfterFormat('+38 050 123 45 67', 2)).toBe(15)
  })
})
