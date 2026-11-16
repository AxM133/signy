import type { Ref } from 'react'

/**
 * Скрытое поле-ловушка для ботов. Людям недоступно: вне экрана, не в порядке табуляции,
 * скрыто от скринридеров. Название — правдоподобное, чтобы автозаполнение ботов его выбрало.
 */
export const HoneypotField = ({ ref }: { ref: Ref<HTMLInputElement> }) => (
  <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
    <label>
      Сайт компании
      <input ref={ref} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
    </label>
  </div>
)
