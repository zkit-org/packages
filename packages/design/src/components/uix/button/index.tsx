import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import { Button as UIButton } from '@easykit/design/components/ui/button'
import { Spin } from '@easykit/design/components/uix/spin'
import { cn } from '@easykit/design/lib'
export interface ButtonProps extends ComponentProps<typeof UIButton> {
  loading?: boolean
  long?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const { loading = false, long = false, disabled = false, className, ...rest } = props
  const elementRef = forwardedRef

  return (
    <UIButton
      {...rest}
      className={cn('gap-0.5', className, long ? 'w-full' : null)}
      disabled={loading || disabled}
      ref={elementRef}
    >
      {loading ? <Spin /> : null}
      {props.children}
    </UIButton>
  )
})

Button.displayName = 'Button'
