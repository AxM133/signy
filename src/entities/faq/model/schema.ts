import { z } from 'zod'

export const faqQuestionSchema = z.object({ id: z.string(), question: z.string(), answer: z.string() })
export const faqGroupSchema = z.object({
  id: z.string(),
  title: z.string(),
  popular: z.boolean().optional(),
  questions: z.array(faqQuestionSchema),
})
export type FaqQuestion = z.infer<typeof faqQuestionSchema>
export type FaqGroup = z.infer<typeof faqGroupSchema>
