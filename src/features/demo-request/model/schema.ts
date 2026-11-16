import { z } from 'zod'
import { emailField, nameField, phoneField } from '@/shared/lib/validation'

export const demoRequestSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
})
export type DemoRequestValues = z.infer<typeof demoRequestSchema>
