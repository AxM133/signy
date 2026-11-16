import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import { Spinner } from './Spinner'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonClasses'


interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  pending?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps & { to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>
type ButtonAsLink = CommonProps & { to: string } & Omit<ComponentProps<typeof Link>, 'to' | 'className' | 'children'>

export const Button = (props: ButtonAsButton | ButtonAsLink) => {
  const { variant = 'primary', size = 'md', pending, className, children, ...rest } = props
  const classes = buttonClasses(variant, size, pending, className)

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link {...(rest as Omit<ButtonAsLink, keyof CommonProps>)} className={classes}>
        {children}
      </Link>
    )
  }
  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button {...buttonRest} type={type} className={classes} aria-busy={pending || undefined} disabled={pending || buttonRest.disabled}>
      {pending && <Spinner className="size-4" />}
      {children}
    </button>
  )
}
