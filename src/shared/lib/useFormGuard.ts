import { useCallback, useEffect, useRef, useState } from 'react'
import { checkRateLimit, recordAttempt, type RateLimitRule } from './rateLimit'

/** Быстрее этого человек форму заполнить и отправить не успевает. */
export const MIN_FILL_MS = 1500
export const DEFAULT_RULE: RateLimitRule = { max: 3, windowMs: 10 * 60_000 }

/**
 * Лёгкая защита формы от ботов и повторных отправок на стороне клиента:
 *  1. honeypot — скрытое поле, которое заполняют только скрипты (тогда делаем вид, что всё ок);
 *  2. минимальное время заполнения;
 *  3. ограничение частоты отправок.
 * Не заменяет серверную проверку и капчу — см. docs/SECURITY.md.
 */
export const useFormGuard = (formId: string, rule: RateLimitRule = DEFAULT_RULE) => {
  const honeypotRef = useRef<HTMLInputElement>(null)
  const readyAt = useRef(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    readyAt.current = Date.now()
  }, [])

  /** Вызывайте внутри `handleSubmit` — после успешной валидации полей. */
  const run = useCallback(
    (submit: () => void, onBot: () => void) => {
      setError(null)

      if (honeypotRef.current?.value) {
        onBot() // бот: имитируем успех, ничего не отправляя
        return
      }
      if (Date.now() - readyAt.current < MIN_FILL_MS) {
        setError('Слишком быстро — подождите секунду и отправьте форму ещё раз.')
        return
      }
      const limit = checkRateLimit(formId, rule)
      if (!limit.allowed) {
        const minutes = Math.max(1, Math.ceil(limit.retryAfterMs / 60_000))
        setError(`Слишком много попыток. Попробуйте снова через ${minutes} мин.`)
        return
      }
      recordAttempt(formId, rule)
      submit()
    },
    [formId, rule],
  )

  return { honeypotRef, error, run }
}
