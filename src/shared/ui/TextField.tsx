import { useId, type ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

interface FieldBaseProps {
  label?: string
  error?: string
  hint?: string
}

const controlBase =
  'w-full border bg-white text-[17px] text-ink placeholder:text-slate-400 outline-none transition-all duration-200 ' +
  'focus:border-brand focus:shadow-[0_0_0_4px_rgba(16,100,229,0.14)]'

export const TextField = ({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: FieldBaseProps & ComponentProps<'input'>) => {
  const auto = useId()
  const inputId = id ?? auto
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="px-5 text-[17px] text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={cn(
          controlBase,
          'h-[50px] rounded-full px-5',
          error ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.15)]' : 'border-night',
          className,
        )}
        {...props}
      />
      <FieldMessage id={inputId} error={error} hint={hint} />
    </div>
  )
}

export const TextArea = ({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: FieldBaseProps & ComponentProps<'textarea'>) => {
  const auto = useId()
  const inputId = id ?? auto
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="px-5 text-[17px] text-ink">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={cn(
          controlBase,
          'min-h-[138px] resize-y rounded-md px-5 py-3',
          error ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.15)]' : 'border-night',
          className,
        )}
        {...props}
      />
      <FieldMessage id={inputId} error={error} hint={hint} />
    </div>
  )
}

const FieldMessage = ({ id, error, hint }: { id: string; error?: string; hint?: string }) => {
  if (error)
    return (
      <p id={`${id}-error`} role="alert" className="px-5 text-[13px] text-red-600">
        {error}
      </p>
    )
  if (hint)
    return (
      <p id={`${id}-hint`} className="px-5 text-[13px] text-muted">
        {hint}
      </p>
    )
  return null
}
