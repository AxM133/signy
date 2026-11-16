import { simulateLatency } from '@/shared/api'
import { sendMessageSchema, type SendMessageValues } from '../model/schema'

/** Мок отправки сообщения менеджерам. */
export const sendMessage = async (values: SendMessageValues) => {
  sendMessageSchema.parse(values)
  return simulateLatency({ ok: true as const }, 900)
}
