import {FC, forwardRef, ReactNode, useState} from "react";
import { Checkbox } from "@easykit/design/components/uix/checkbox";
import remove from 'lodash/remove';
import classNames from "classnames";

export interface CheckboxGroupOptionProps {
    label: ReactNode;
    value: string;
    disabled?: boolean;
}

export interface CheckboxGroupProps {
    options?: CheckboxGroupOptionProps[];
    value?: string[];
    onChange?: (value: string[]) => void;
    itemClassName?: string;
    className?: string;
}

export const CheckboxGroup: FC<CheckboxGroupProps> = forwardRef((props, ref) => {
    const {
        options = [],
        itemClassName,
        className
    } = props;

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

    return <div className={classNames("space-x-2 space-y-2 flex flex-wrap justify-start items-center -m-2", className)}>
        <span />
        {
            options.map((option) => {
                return <label
                    key={option.value}
                    className={classNames("flex justify-start items-center", "ml-1 space-x-1", itemClassName)}
                >
                    <Checkbox
                        checked={checkedValues.includes(option.value)}
                        onCheckedChange={(checked: boolean) => onCheckedChange(option.value, checked)}
                    />
                    <span>{option.label}</span>
                </label>
            })
        }
    </div>
});
