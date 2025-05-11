import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import {forwardRef, ReactNode} from 'react';
import {cn} from "@easykit/design/lib";
import {Empty} from '@easykit/design/components/uix/empty';

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
  empty?: ReactNode;
}

// eslint-disable-next-line react/display-name,@typescript-eslint/no-unused-vars
export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    options = [],
    value,
    onChange,
    placeholder,
    className,
    empty,
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
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent
      side={props.side}
      sideOffset={props.sideOffset}
      align={props.align}
      alignOffset={props.alignOffset}
    >
      { (options && options.length) ? options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>) : (empty || <Empty />) }
    </SelectContent>
  </UISelect>
})
