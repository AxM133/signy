import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { LIMITS } from '@/shared/lib/validation'
import { useFormGuard } from '@/shared/lib/useFormGuard'
import { Button, HoneypotField } from '@/shared/ui'
import { subscribeSchema, type SubscribeValues } from '../model/schema'
import { useSubscribe } from '../model/useSubscribe'

export const SubscribeForm = ({ className }: { className?: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscribeValues>({ resolver: zodResolver(subscribeSchema), defaultValues: { email: '' } })
  const mutation = useSubscribe()
  const { honeypotRef, error: guardError, run: runGuarded } = useFormGuard('subscribe')
  // Подписка — единственная форма, где «успех» бота безвреден: показываем его без отправки
  const [fakeDone, setFakeDone] = useState(false)

  const onSubmit = handleSubmit((values) =>
    runGuarded(
      () => mutation.mutate(values, { onSuccess: () => reset() }),
      () => setFakeDone(true),
    ),
  )
  const error =
    errors.email?.message ?? guardError ?? (mutation.isError ? 'Не удалось оформить подписку. Попробуйте позже.' : undefined)

  return (
    <div className={cn('mx-auto w-full max-w-[600px]', className)}>
      <AnimatePresence mode="wait" initial={false}>
        {mutation.isSuccess || fakeDone ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-[50px] items-center justify-center gap-3 text-[18px] text-ink"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-brand text-white">
              <Check className="size-5" strokeWidth={3} />
            </span>
            Спасибо! Мы добавили вас в рассылку
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            exit={{ opacity: 0 }}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:justify-center sm:gap-[18px]"
          >
            <div className="flex w-full flex-col gap-1.5 sm:w-[399px]">
              <HoneypotField ref={honeypotRef} />
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={LIMITS.email}
                aria-label="Электронная почта"
                aria-invalid={error ? true : undefined}
                placeholder="ivan@mail.com"
                className={cn(
                  'h-[50px] w-full rounded-full border bg-white px-6 text-[17px] text-ink outline-none transition-all duration-200 placeholder:text-slate-400',
                  'focus:shadow-[0_0_0_4px_rgba(16,100,229,0.16)]',
                  error ? 'border-red-500' : 'border-brand',
                )}
                {...register('email')}
              />
              {error && (
                <p role="alert" className="px-6 text-left text-[13px] text-red-600">
                  {error}
                </p>
              )}
            </div>
            <Button type="submit" pending={mutation.isPending} className="h-[50px] sm:min-w-[178px]">
              Отправить
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
