import {RadioGroup as UIRadioGroup, RadioGroupItem} from "@easykit/design/components/ui/radio-group";
import {Label} from "@easykit/design/components/ui/label";
import {FC, forwardRef, PropsWithChildren, useState} from "react";

export interface SimpleRadioGroupOptionProps {
  label: string;
  value: string;
}

export interface SimpleRadioGroupProps extends PropsWithChildren {
  value?: string;
  onChange?: (value: string) => void;
  options?: SimpleRadioGroupOptionProps[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,react/display-name
export const SimpleRadioGroup: FC<SimpleRadioGroupProps> = forwardRef((props, ref) => {
  const {
    options = [],
    value,
    onChange = () => {
    }
  } = props;

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
