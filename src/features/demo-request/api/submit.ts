import { simulateLatency } from '@/shared/api'
import { demoRequestSchema } from '../model/schema'

export interface DemoRequestPayload {
  name: string
  email: string
  phone: string
  /** Откуда пришла заявка: «hero», «plan:business», «header» … */
  source?: string
}

/** Мок отправки заявки на демо. Реальный запрос подставляется сюда. */
export const submitDemoRequest = async (payload: DemoRequestPayload) => {
  const { source, ...fields } = payload
  demoRequestSchema.parse(fields)
  return simulateLatency({ ok: true as const, source }, 900)
}
