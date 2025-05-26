import { Button as UIButton } from '@easykit/design/components/ui/button'
import {Spin} from "@easykit/design/components/uix/spin";
import { cn } from '@easykit/design/lib'
import {forwardRef} from "react";
import type { ComponentProps } from 'react'
export interface ButtonProps extends ComponentProps<typeof UIButton> {
  loading?: boolean;
  long?: boolean;
  htmlType?: "submit" | "reset" | "button" | undefined;
  wrapper?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    loading = false,
    long = false,
    disabled = false,
    className,
    wrapper = true,
    ...rest
  } = props;

  return <UIButton
    {...rest}
    ref={ref}
    className={cn("space-x-1", className, long ? 'w-full' : null)}
    disabled={loading || disabled}
  >
    {loading ? <Spin/> : null}
    {wrapper ? <span>{props.children}</span> : props.children}
  </UIButton>
});

Button.displayName = "Button";
