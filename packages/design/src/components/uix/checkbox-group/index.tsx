import { type FC, forwardRef, type ReactNode, useState } from 'react'
import classNames from 'classnames'
import remove from 'lodash/remove'
import { Checkbox } from '@easykit/design/components/uix/checkbox'

export interface CheckboxGroupOptionProps {
  label: ReactNode
  value: string
  disabled?: boolean
}

export interface CheckboxGroupProps {
  options?: CheckboxGroupOptionProps[]
  value?: string[]
  onChange?: (value: string[]) => void
  itemClassName?: string
  checkboxClassName?: string
  className?: string
}

export const CheckboxGroup: FC<CheckboxGroupProps> = forwardRef((props, _ref) => {
  const { options = [], itemClassName, className, checkboxClassName } = props

  const [checkedValues, setCheckedValues] = useState<string[]>(props.value || [])

  const onCheckedChange = (value: string, checked: boolean) => {
    if (checked) {
      checkedValues.push(value)
    } else {
      remove(checkedValues, (v) => v === value)
    }
    setCheckedValues([...checkedValues])
    props.onChange?.([...checkedValues])
  }

  return (
    <div className={classNames('-m-2 flex flex-wrap items-center justify-start space-x-2 space-y-2', className)}>
      <span />
      {options.map((option) => {
        const id = `checkbox-group-${option.value}`
        return (
          <label
            className={classNames('flex items-center justify-start', 'ml-1 space-x-1', itemClassName)}
            htmlFor={id}
            key={option.value}
          >
            <Checkbox
              checked={checkedValues.includes(option.value)}
              className={checkboxClassName}
              id={id}
              onCheckedChange={(checked: boolean) => onCheckedChange(option.value, checked)}
            />
            <span>{option.label}</span>
          </label>
        )
      })}
    </div>
  )
})
