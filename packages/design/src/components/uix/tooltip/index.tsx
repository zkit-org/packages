import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipUI,
} from '@easykit/design/components/ui/tooltip'
import type { FC, PropsWithChildren, ReactNode } from 'react'

type Side = 'top' | 'right' | 'bottom' | 'left'

export type TooltipProps = PropsWithChildren & {
  content: ReactNode
  side?: Side
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Tooltip: FC<TooltipProps> = (props) => {
  const { open, onOpenChange } = props
  return (
    <TooltipProvider>
      <TooltipUI open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild={true}>{props.children}</TooltipTrigger>
        <TooltipContent side={props.side}>{props.content}</TooltipContent>
      </TooltipUI>
    </TooltipProvider>
  )
}
