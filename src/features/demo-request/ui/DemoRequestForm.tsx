import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LIMITS } from '@/shared/lib/validation'
import { useFormGuard } from '@/shared/lib/useFormGuard'
import { Button, HoneypotField, PhoneField, TextField } from '@/shared/ui'
import { demoRequestSchema, type DemoRequestValues } from '../model/schema'
import { useSubmitDemoRequest } from '../model/useSubmitDemoRequest'

interface DemoRequestFormProps {
  source?: string
  onSuccess: () => void
}

export const DemoRequestForm = ({ source, onSuccess }: DemoRequestFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoRequestValues>({ resolver: zodResolver(demoRequestSchema), defaultValues: { name: '', email: '', phone: '' } })
  const mutation = useSubmitDemoRequest()
  const { honeypotRef, error: guardError, run: runGuarded } = useFormGuard('demo-request')

  const onSubmit = handleSubmit((values) =>
    runGuarded(() => mutation.mutate({ ...values, source }, { onSuccess }), onSuccess),
  )

  return (
    <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-3.5">
      <p className="text-center text-[17px] leading-6 text-ink">Заполни форму и наши менеджеры свяжутся с тобой</p>
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
      {(guardError || mutation.isError) && (
        <p role="alert" className="text-center text-[14px] text-red-600">
          {guardError ?? 'Не удалось отправить заявку. Попробуйте ещё раз чуть позже.'}
        </p>
      )}
      <Button type="submit" size="sm" pending={mutation.isPending} className="mx-auto mt-3 min-w-[217px]">
        Отправить
      </Button>
    </form>
  )
}
