import {cn} from "@easykit/design/lib";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button, Calendar
} from "@easykit/design";
import {format} from "date-fns";
import {DateRange} from "react-day-picker";
import {Calendar as CalendarIcon} from "lucide-react";
import {forwardRef, HTMLAttributes, useContext, useState} from "react";
import {UIXContext} from "@easykit/design/components/uix/config-provider";
import get from "lodash/get";

export type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (value: DateRange) => void;
  placeholder?: string;
  format?: string;
} & HTMLAttributes<HTMLDivElement>;

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>((props, ref) => {
  const {
    className,
    value,
    onChange,
  } = props;

  const config = useContext(UIXContext);
  const locale = get(config.locale, "DateRangePicker.locale");
  const formatConfig = props.format || get(config.locale, "DateRangePicker.locale");

  const [date, setDate] = useState<DateRange | undefined>(value)

  return <div className={cn("grid gap-2", className)} ref={ref}>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type={"button"}
          id="date"
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4"/>
          {date?.from ? (
            date.to ?
              <>{format(date.from, formatConfig)} - {format(date.to, formatConfig)}</>
              : format(date.from, formatConfig)
          ) : (
            <span>{props.placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={locale}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={(v) => {
            setDate(v);
            onChange?.(v!);
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  </div>;
});

DateRangePicker.displayName = "DateRangePicker";
