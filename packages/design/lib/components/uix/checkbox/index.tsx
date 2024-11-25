import {ElementRef, forwardRef, ComponentPropsWithoutRef, useRef, useMemo, useCallback} from "react";
import { Checkbox as UICheckbox } from "@easykit/design/components/ui/checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@easykit/design/lib";
import { MinusIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

export type CheckboxProps = Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "onChange"> & {
    indeterminate?: boolean;
    label?: string;
    field?: boolean;
    value?: boolean;
    onChange?: (value: boolean) => void;
}

export const Checkbox = forwardRef<
    ElementRef<typeof UICheckbox>,
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
        ...rest
    } = props;

    const v = useMemo(() => field ? value : checked, [value, checked, field]);
    const handleChange = useCallback((checked: boolean) => {
        if(field) {
            onChange?.(checked);
        }else{
            onCheckedChange?.(checked);
        }
    }, [field, onCheckedChange, onChange]);

    const checkbox = <UICheckbox
        {...rest}
        ref={ref}
        checked={v}
        onCheckedChange={(checked) => handleChange(checked as boolean)}
        className={cn(
            indeterminate && "bg-primary text-primary-foreground",
            indeterminate && "flex items-center justify-center",
            props.className
        )}
    >
        {indeterminate && <MinusIcon className="h-4 w-4"/>}
    </UICheckbox>;
    if(!label)
        return checkbox;
    return <label
        className={classNames(
            "inline-flex justify-start items-center space-x-1",
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        )}
    >
        {checkbox}
        <span>{label}</span>
    </label>
})
