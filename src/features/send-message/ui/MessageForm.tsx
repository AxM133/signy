import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/shared/lib/cn'
import { LIMITS } from '@/shared/lib/validation'
import { useFormGuard } from '@/shared/lib/useFormGuard'
import { Button, HoneypotField, PhoneField, TextArea, TextField } from '@/shared/ui'
import { sendMessageSchema, type SendMessageValues } from '../model/schema'
import { useSendMessage } from '../model/useSendMessage'
import { MessageSentModal } from './MessageSentModal'

interface MessageFormProps {
  /** «Сообщение:» на странице контактов, «Твой вопрос:» в FAQ */
  messageLabel?: string
  className?: string
  /** Кнопка по центру (FAQ) или слева (контакты) */
  centered?: boolean
}

export const MessageForm = ({ messageLabel = 'Сообщение:', className, centered = false }: MessageFormProps) => {
  const [sentOpen, setSentOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessageValues>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  })
  const mutation = useSendMessage()
  const { honeypotRef, error: guardError, run: runGuarded } = useFormGuard('send-message')

  const done = () => {
    reset()
    setSentOpen(true)
  }
  const onSubmit = handleSubmit((values) => runGuarded(() => mutation.mutate(values, { onSuccess: done }), done))

  return (
    <>
      <form onSubmit={onSubmit} noValidate className={cn('flex flex-col gap-3.5', className)}>
        <HoneypotField ref={honeypotRef} />
        <TextField label="Имя*:" placeholder="Иван" autoComplete="given-name" maxLength={LIMITS.name} error={errors.name?.message} {...register('name')} />
        <TextField
          label="Электронная почта*:"
          type="email"
          inputMode="email"
          placeholder="ivan@mail.com"
          autoComplete="email"
          maxLength={LIMITS.email}
          error={errors.email?.message}
          {...register('email')}
        />
        <PhoneField label="Телефон*:" error={errors.phone?.message} {...register('phone')} />
        <TextArea
          label={messageLabel}
          placeholder="введите тут"
          maxLength={LIMITS.message}
          error={errors.message?.message}
          {...register('message')}
        />
        {(guardError || mutation.isError) && (
          <p role="alert" className="px-5 text-[14px] text-red-600">
            {guardError ?? 'Не удалось отправить сообщение. Попробуйте ещё раз чуть позже.'}
          </p>
        )}
        <Button type="submit" size="sm" pending={mutation.isPending} className={cn('mt-3 min-w-[217px]', centered ? 'mx-auto' : 'self-start')}>
          Отправить
        </Button>
      </form>
      <MessageSentModal open={sentOpen} onClose={() => setSentOpen(false)} />
    </>
  )
}
