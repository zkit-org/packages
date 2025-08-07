import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

export interface DividerProps extends PropsWithChildren {
  orientation: 'left' | 'center' | 'right'
  className?: string
  labelClassName?: string
}

export const Divider = (props: DividerProps) => {
  return (
    <div className={cn('relative my-6', props.className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className={cn('bg-background px-2 text-muted-foreground', props.labelClassName)}>{props.children}</span>
      </div>
    </div>
  )
};
