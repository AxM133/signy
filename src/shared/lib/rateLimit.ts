/**
 * Клиентский ограничитель частоты отправки форм (скользящее окно).
 *
 * ВАЖНО: это защита от случайных повторов и примитивных скриптов, а не от целенаправленного
 * атакующего — sessionStorage очищается одним кликом. Настоящий лимит должен стоять на сервере.
 */
export interface RateLimitRule {
  max: number
  windowMs: number
}

export interface RateLimitResult {
  allowed: boolean
  retryAfterMs: number
}

export interface KeyValueStore {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

const memory = new Map<string, string>()
const memoryStore: KeyValueStore = {
  getItem: (k) => memory.get(k) ?? null,
  setItem: (k, v) => void memory.set(k, v),
}

const defaultStore = (): KeyValueStore => {
  try {
    const s = window.sessionStorage
    s.setItem('__rl_probe', '1')
    s.removeItem('__rl_probe')
    return s
  } catch {
    return memoryStore // приватный режим / запрещённое хранилище
  }
}

const read = (store: KeyValueStore, key: string): number[] => {
  try {
    const parsed: unknown = JSON.parse(store.getItem(key) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((n): n is number => typeof n === 'number' && Number.isFinite(n)) : []
  } catch {
    return []
  }
}

const storageKey = (id: string) => `signy:rl:${id}`

/** Проверяет лимит, не записывая попытку. */
export const checkRateLimit = (
  id: string,
  rule: RateLimitRule,
  now = Date.now(),
  store: KeyValueStore = defaultStore(),
): RateLimitResult => {
  const recent = read(store, storageKey(id)).filter((t) => now - t < rule.windowMs)
  if (recent.length < rule.max) return { allowed: true, retryAfterMs: 0 }
  return { allowed: false, retryAfterMs: Math.max(0, Math.min(...recent) + rule.windowMs - now) }
}

/** Записывает попытку отправки. */
export const recordAttempt = (id: string, rule: RateLimitRule, now = Date.now(), store: KeyValueStore = defaultStore()) => {
  const recent = read(store, storageKey(id)).filter((t) => now - t < rule.windowMs)
  recent.push(now)
  try {
    store.setItem(storageKey(id), JSON.stringify(recent.slice(-rule.max)))
  } catch {
    /* хранилище недоступно — лимит просто не сохранится */
  }
}
