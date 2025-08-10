import { type FC, forwardRef, useState } from 'react'
import { Switch as UISwitch } from '@easykit/design/components/ui/switch'

export interface SwitchProps {
  value?: boolean
  onChange?: (value: boolean) => void
  readonly?: boolean
}

export const Switch: FC<SwitchProps> = forwardRef((props, _ref) => {
  const { onChange, readonly = false } = props

  const [checked, setChecked] = useState(props.value)

  const core = (
    <UISwitch
      checked={checked}
      onCheckedChange={(checked) => {
        setChecked(checked)
        onChange?.(checked)
      }}
    />
  )
  return readonly ? (
    <div className="relative inline-block">
      {core}
      <div className="absolute top-0 right-0 bottom-0 left-0" />
    </div>
  ) : (
    core
  )
})
