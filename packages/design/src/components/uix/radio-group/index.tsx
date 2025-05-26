import {Label} from "@easykit/design/components/ui/label";
import { RadioGroupItem, RadioGroup as UIRadioGroup } from '@easykit/design/components/ui/radio-group'
import { type FC, type PropsWithChildren, forwardRef, useState } from 'react'

export interface SimpleRadioGroupOptionProps {
  label: string;
  value: string;
}

export interface SimpleRadioGroupProps extends PropsWithChildren {
  value?: string;
  onChange?: (value: string) => void;
  options?: SimpleRadioGroupOptionProps[];
}

export const SimpleRadioGroup: FC<SimpleRadioGroupProps> = forwardRef((props, ref) => {
  const { options = [], value, onChange } = props

  const [labelKey] = useState(Date.now());

  return <UIRadioGroup value={value} onValueChange={onChange}>
    {
      options.map((option) => {
        const id = `${labelKey}-${option.value}`;
        return <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={id}/>
          <Label htmlFor={id}>{option.label}</Label>
        </div>
      })
    }
  </UIRadioGroup>
})
