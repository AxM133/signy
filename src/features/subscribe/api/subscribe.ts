import { simulateLatency } from '@/shared/api'
import { subscribeSchema, type SubscribeValues } from '../model/schema'

/** Мок подписки на рассылку. */
export const subscribe = async (values: SubscribeValues) => {
  subscribeSchema.parse(values)
  return simulateLatency({ ok: true as const }, 800)
}
