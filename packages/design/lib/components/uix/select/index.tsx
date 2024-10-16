import {
    Select as UISelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select"
import {forwardRef} from "react";
import {cn} from "@easykit/design/lib";

export interface SelectOptionProps {
    value: string;
    label: string;
}

export interface SelectProps {
    options: SelectOptionProps[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const {
        options = [],
        value,
        onChange,
        placeholder,
        className,
        ...rest
    } = props;

    return <UISelect
        {...rest}
        onValueChange={onChange}
        value={value}
    >
        <SelectTrigger className={cn(
            "w-[180px]",
            className
        )}>
            <SelectValue placeholder={placeholder}>
                {options.find((option) => option.value === value)?.label}
            </SelectValue>
        </SelectTrigger>
        <SelectContent
            side={props.side}
            sideOffset={props.sideOffset}
            align={props.align}
            alignOffset={props.alignOffset}
        >
            { options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>) }
        </SelectContent>
    </UISelect>
})
