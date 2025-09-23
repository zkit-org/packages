import { forwardRef, type HTMLAttributes, useContext, useState } from "react";
import { format } from "date-fns";
import get from "lodash/get";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@easykit/design";
import { UIXContext } from "@easykit/design/components/uix/config-provider";
import { cn } from "@easykit/design/lib";

export type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (value: DateRange) => void;
  placeholder?: string;
  format?: string;
} & HTMLAttributes<HTMLDivElement>;

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>((props, forwardedRef) => {
  const { className, value, onChange } = props;
  const elementRef = forwardedRef;

  const config = useContext(UIXContext);
  const locale = get(config.locale, "DateRangePicker.locale");
  const formatConfig = props.format || get(config.locale, "DateRangePicker.format") || "yyyy-MM-dd";

  const [date, setDate] = useState<DateRange | undefined>(value);

  return (
    <div className={cn("grid gap-2", className)} ref={elementRef}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
            id="date"
            type="button"
            variant="outline"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, formatConfig)} - {format(date.to, formatConfig)}
                </>
              ) : (
                format(date.from, formatConfig)
              )
            ) : (
              <span>{props.placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={date?.from}
            initialFocus
            locale={locale}
            mode="range"
            numberOfMonths={2}
            onSelect={(v) => {
              setDate(v);
              onChange?.(v!);
            }}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";
