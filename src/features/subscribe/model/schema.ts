import { z } from 'zod'
import { emailField } from '@/shared/lib/validation'

export const subscribeSchema = z.object({ email: emailField })
export type SubscribeValues = z.infer<typeof subscribeSchema>
