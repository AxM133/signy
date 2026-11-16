import { z } from 'zod'

/**
 * Отключаем JIT-компиляцию zod: она использует `new Function`, а строгий CSP (без `unsafe-eval`)
 * это запрещает. Для форм из нескольких полей разницы в скорости нет.
 */
z.config({ jitless: true })
