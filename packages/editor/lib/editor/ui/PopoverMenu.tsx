import {
  Close as PopoverClose,
  Content as PopoverContent,
  Portal as PopoverPortal,
  Root as PopoverRoot,
  Trigger as PopoverTrigger,
} from '@radix-ui/react-popover'
import {icons} from 'lucide-react'
import { type ReactNode, forwardRef } from 'react'
import { cn } from '../utils'
import {Surface} from './Surface'
import {Toolbar} from './Toolbar'

export const Trigger = PopoverTrigger
export const Portal = PopoverPortal

export type MenuProps = {
  children: ReactNode
  trigger: ReactNode
  triggerClassName?: string
  customTrigger?: boolean
  isOpen?: boolean
  onOpenChange?: (state: boolean) => void
  withPortal?: boolean
  tooltip?: string
  isActive?: boolean
}

export const Menu = ({
  customTrigger,
  trigger,
  triggerClassName,
  children,
  isOpen,
  withPortal,
  tooltip,
  onOpenChange,
}: MenuProps) => {
  return (
    <PopoverRoot onOpenChange={onOpenChange}>
      {customTrigger ? (
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      ) : (
        <PopoverTrigger asChild>
          <Toolbar.Button className={triggerClassName} tooltip={isOpen ? '' : tooltip}>
            {trigger}
          </Toolbar.Button>
        </PopoverTrigger>
      )}
      {withPortal ? (
        <PopoverPortal>
          <PopoverContent asChild sideOffset={8}>
            <Surface className="z-[9999] flex max-h-80 min-w-[15rem] flex-col gap-0.5 overflow-auto p-2">
              {children}
            </Surface>
          </PopoverContent>
        </PopoverPortal>
      ) : (
        <PopoverContent asChild sideOffset={8}>
          <Surface className="z-[9999] flex max-h-80 min-w-[15rem] flex-col gap-0.5 overflow-auto p-2">
            {children}
          </Surface>
        </PopoverContent>
      )}
    </PopoverRoot>
  )
}

Menu.displayName = 'Menu'

export const Item = ({
  label,
  close = true,
  icon,
  iconComponent,
  disabled,
  onClick,
  isActive,
}: {
  label: string | ReactNode
  icon?: keyof typeof icons
  iconComponent?: ReactNode
  close?: boolean
  disabled?: boolean
  onClick: () => void
  isActive?: boolean
}) => {
  const className = cn(
    'flex w-full items-center gap-2 rounded bg-transparent p-1.5 text-left font-medium text-neutral-500 text-sm',
    !(isActive || disabled),
    'hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200',
    isActive && !disabled && 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200',
    disabled && 'cursor-not-allowed text-neutral-400 dark:text-neutral-600'
  )

  const IconComponent = icon ? icons[icon] : null
  const IconCustomComponent = iconComponent || null

  const ItemComponent = close ? PopoverClose : 'button'

  return (
    <ItemComponent className={className} onClick={onClick} disabled={disabled}>
      {IconComponent && <IconComponent className="h-4 w-4" />}
      {IconCustomComponent}
      {label}
    </ItemComponent>
  )
}

export type CategoryTitle = {
  children: ReactNode
}

export const CategoryTitle = ({children}: CategoryTitle) => {
  return (
    <div className="mt-4 mb-1.5 select-none px-1 font-medium text-[0.625rem] text-neutral-400 uppercase first:mt-1.5 dark:text-neutral-600">
      {children}
    </div>
  )
}

export const Divider = forwardRef<HTMLHRElement>((props, ref) => {
  return <hr {...props} ref={ref} className="my-1 border-neutral-200 dark:border-neutral-800"/>
})

Divider.displayName = 'Divider'
