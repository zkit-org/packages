import {ElementRef, forwardRef, ComponentPropsWithoutRef, useRef, useMemo, useCallback} from "react";
import { Checkbox as UICheckbox } from "@/components/ui/checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { MinusIcon } from "@radix-ui/react-icons";

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    indeterminate?: "true" | "false";
    label?: string;
    field?: "true" | "false";
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
        field = "false",
        onCheckedChange,
        onChange,
        indeterminate, label
    } = props;
    const indeterminateValue = (indeterminate === "true");
    const idRef = useRef(Date.now());

    const v = useMemo(() => field === "true" ? value : checked, [value, checked, field]);
    const handleChange = useCallback((checked: boolean) => {
        if(field === "true") {
            onChange?.(checked);
        }else{
            onCheckedChange?.(checked);
        }
    }, [field, onCheckedChange, onChange]);

    const checkbox = <UICheckbox
        ref={ref}
        id={idRef.current?.toString()}
        checked={v}
        onCheckedChange={(checked) => handleChange(checked as boolean)}
        {...props}
        className={cn(
            indeterminateValue && "bg-primary text-primary-foreground",
            indeterminateValue && "flex items-center justify-center",
            props.className
        )}
    >
        {indeterminateValue && <MinusIcon className="h-4 w-4"/>}
    </UICheckbox>;
    if(!label)
        return checkbox;
    return <div className={"flex justify-start items-center space-x-1"}>
        { checkbox }
        <label
            htmlFor={idRef.current?.toString()}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label}
        </label>
    </div>
})
