import { type FC, forwardRef, type PropsWithChildren, useState } from "react";

import { Label } from "@easykit/design/components/ui/label";
import { RadioGroupItem, RadioGroup as UIRadioGroup } from "@easykit/design/components/ui/radio-group";

export interface SimpleRadioGroupOptionProps {
  label: string;
  value: string;
}

export interface SimpleRadioGroupProps extends PropsWithChildren {
  value?: string;
  onChange?: (value: string) => void;
  options?: SimpleRadioGroupOptionProps[];
}

export const SimpleRadioGroup: FC<SimpleRadioGroupProps> = forwardRef((props, _ref) => {
  const { options = [], value, onChange } = props;

  const [labelKey] = useState(Date.now());

  return (
    <UIRadioGroup onValueChange={onChange} value={value}>
      {options.map((option) => {
        const id = `${labelKey}-${option.value}`;
        return (
          <div className="flex items-center space-x-2" key={option.value}>
            <RadioGroupItem id={id} value={option.value} />
            <Label htmlFor={id}>{option.label}</Label>
          </div>
        );
      })}
    </UIRadioGroup>
  );
});
