import { Empty } from '@easykit/design/components/uix/empty'
import { cn } from '@easykit/design/lib'
import { XIcon } from 'lucide-react'
import { type MouseEvent, type ReactNode, forwardRef, useState } from 'react'
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as UISelect } from '../../ui/select'

export interface SelectOptionProps {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOptionProps[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  empty?: ReactNode
  allowClear?: boolean
  triggerClassName?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, _ref) => {
  const {
    options = [],
    value,
    defaultValue,
    onChange,
    placeholder,
    className,
    empty,
    allowClear,
    triggerClassName,
    ...rest
  } = props

  const [innerValue, setInnerValue] = useState<string | undefined>(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : innerValue

  const handleChange = (val: string) => {
    if (onChange) {
      onChange(val)
    }
    if (!isControlled) {
      setInnerValue(val)
    }
  }

  const clear = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    handleChange('')
  }

  return (
    <UISelect {...rest} onValueChange={handleChange} value={currentValue} defaultValue={defaultValue}>
      <div className={cn('relative inline-block', allowClear && currentValue ? 'group' : '', className)}>
        <SelectTrigger className={cn('flex w-full', triggerClassName)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        {allowClear && currentValue && (
          <div
            className="absolute top-0 right-0 z-50 hidden h-full cursor-pointer items-center justify-center px-3 group-hover:flex"
            onClick={clear}
          >
            <XIcon className="size-4 opacity-50" />
          </div>
        )}
      </div>
      <SelectContent
        side={props.side}
        sideOffset={props.sideOffset}
        align={props.align}
        alignOffset={props.alignOffset}
      >
        {options?.length
          ? options.map((option) => (
              <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))
          : empty || <Empty />}
      </SelectContent>
    </UISelect>
  )
})
