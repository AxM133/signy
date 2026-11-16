import type { ChangeEvent, ComponentProps, KeyboardEvent } from 'react'
import { caretAfterFormat, countDigits, droppedDigits, formatPhoneInput } from '@/shared/lib/phone'
import { TextField } from './TextField'

/**
 * Поле телефона с маской `+38 0XX XXX XX XX`: буквы и символы не вводятся (и не вставляются),
 * цифр больше десяти не набрать. Совместимо с `register()` из react-hook-form.
 */
export const PhoneField = ({ onChange, onKeyDown, ...props }: ComponentProps<typeof TextField>) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const el = e.target
    const raw = el.value
    const caret = el.selectionStart ?? raw.length
    const formatted = formatPhoneInput(raw)
    if (formatted !== raw) {
      const digitsRight = Math.max(0, countDigits(raw.slice(caret)) - droppedDigits(raw))
      el.value = formatted
      if (document.activeElement === el) {
        const pos = caretAfterFormat(formatted, digitsRight)
        el.setSelectionRange(pos, pos)
      }
    }
    onChange?.(e)
  }

  // Backspace за пробелом должен удалять цифру, а не «застревать» на разделителе
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget
    if (e.key === 'Backspace' && el.selectionStart === el.selectionEnd) {
      const caret = el.selectionStart ?? 0
      if (caret > 0 && !/\d/.test(el.value[caret - 1])) el.setSelectionRange(caret - 1, caret - 1)
    }
    onKeyDown?.(e)
  }

  return (
    <TextField
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="+38 050 123 45 67"
      spellCheck={false}
      {...props}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}
