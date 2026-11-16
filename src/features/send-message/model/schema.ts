import { z } from 'zod'
import { emailField, messageField, nameField, phoneField } from '@/shared/lib/validation'

export const sendMessageSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  message: messageField,
})
export type SendMessageValues = z.infer<typeof sendMessageSchema>
