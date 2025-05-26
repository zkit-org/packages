import { Checkbox as UICheckbox } from '@easykit/design/components/ui/checkbox'
import {cn} from "@easykit/design/lib";
import type * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {MinusIcon} from "@radix-ui/react-icons";
import classNames from "classnames";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ReactNode,
  forwardRef,
  useCallback,
  useId,
  useMemo,
} from 'react'

export type CheckboxProps = Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'onChange'> & {
  indeterminate?: boolean
  label?: ReactNode
  field?: boolean
  value?: boolean
  onChange?: (value: boolean) => void
  children?: ReactNode
}

export const Checkbox = forwardRef<
  ComponentRef<typeof UICheckbox>,
  CheckboxProps
>((props, ref) => {
  const {
    value,
    checked,
    field = false,
    onCheckedChange,
    onChange,
    indeterminate,
    label,
    children,
    ...rest
  } = props;

  const v = useMemo(() => field ? value : checked, [value, checked, field]);
  const handleChange = useCallback((checked: boolean) => {
    if (field) {
      onChange?.(checked);
    } else {
      onCheckedChange?.(checked);
    }
  }, [field, onCheckedChange, onChange]);

  const content = useMemo(() => children || label, [children, label])

  const autoId = useId()
  const id = props.id ?? autoId

  const checkbox = (
    <UICheckbox
      {...rest}
      id={id}
      ref={ref}
      checked={v}
      onCheckedChange={(checked) => handleChange(checked as boolean)}
      className={cn(
        indeterminate && 'bg-primary text-primary-foreground',
        indeterminate && 'flex items-center justify-center',
        !content && props.className
      )}
    >
      {indeterminate && <MinusIcon className="h-4 w-4" />}
    </UICheckbox>
  )
  if (!content)
    return checkbox;
  return (
    <label
      htmlFor={id}
      className={classNames(
        'inline-flex items-center justify-start space-x-1',
        'font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.className
      )}
    >
      {checkbox}
      <span>{content}</span>
    </label>
  )
})

Checkbox.displayName = "Checkbox";
