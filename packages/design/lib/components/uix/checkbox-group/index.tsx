import { FC, forwardRef, useState } from "react";
import { Checkbox } from "@easykit/design/components/uix/checkbox";
import remove from 'lodash/remove';

export interface CheckboxGroupOptionProps {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface CheckboxGroupProps {
    options?: CheckboxGroupOptionProps[];
    value?: string[];
    onChange?: (value: string[]) => void;
}

export const CheckboxGroup: FC<CheckboxGroupProps> = forwardRef((props, ref) => {
    const {
        options = []
    } = props;

    const [labelKey, setLabelKey] = useState<number>(Date.now());
    const [checkedValues, setCheckedValues] = useState<string[]>(props.value || []);

    const onCheckedChange = (value: string, checked: boolean) => {
        if(checked) {
            checkedValues.push(value)
        }else{
            remove(checkedValues, (v) => v === value);
        }
        setCheckedValues([...checkedValues]);
        props.onChange?.([...checkedValues]);
    }

    return <div className={"space-x-2 space-y-2 flex justify-start items-center -m-2"}>
        <span />
        {
            options.map((option) => {
                return <div key={option.value} className={"flex justify-center items-center"}>
                    <Checkbox
                        checked={checkedValues.includes(option.value)}
                        id={`${labelKey}-${option.value}`}
                        onCheckedChange={(checked: boolean) => onCheckedChange(option.value, checked)}
                    />
                    <label
                        htmlFor={`${labelKey}-${option.value}`}
                        className={"ml-1"}
                    >
                        { option.label }
                    </label>
                </div>
            })
        }
    </div>
});
