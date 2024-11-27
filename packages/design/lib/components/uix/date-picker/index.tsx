import {forwardRef, useContext, useState} from "react";
import { addDays, format} from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Button, Select, cn,
    Calendar
} from "@easykit/design"
import {UIXContext} from "@easykit/design/components/uix/config-provider";
import get from "lodash/get";
import {Cross2Icon} from "@radix-ui/react-icons";

export type DatePickerProps = {
    placeholder?: string,
    format?: string,
    preset?: boolean,
    className?: string,
    allowClear?: boolean,
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
    const {
        preset = false,
        allowClear = false,
    } = props;
    const [date, setDate] = useState<Date>()
    const [presetValue, setPresetValue] = useState<string>('');

    const config = useContext(UIXContext);
    const locale = get(config.locale, "DatePicker.locale");
    const formatConfig = props.format || get(config.locale, "DatePicker.format");
    const options = get(config.locale, "DatePicker.options");

    const calendar = <Calendar
        locale={locale}
        mode="single"
        selected={date}
        onSelect={(v) => {
            setDate(v);
            setPresetValue('');
        }}
    />;

    return <Popover>
        <PopoverTrigger asChild>
            <Button
                wrapper={false}
                variant={"outline"}
                className={cn(
                    "justify-start text-left font-normal w-full space-x-1 group",
                    !date && "text-muted-foreground",
                    props.className
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span className={"flex-1"}>{date ? format(date, formatConfig) :props.placeholder}</span>
                { allowClear && date ? <Cross2Icon
                    className={"hidden group-hover:block"}
                    onClick={(e) => {
                        setDate(undefined);
                        setPresetValue('');
                        e.stopPropagation();
                    }}
                /> : null}
            </Button>
        </PopoverTrigger>
        <PopoverContent
            align={"start"}
            className={cn(
                "w-fit flex",
                preset ? "flex-col space-y-2 p-2 " : "p-0"
            )}
        >
            {
                preset ? <>
                    <Select
                        className={"w-full"}
                        value={presetValue}
                        options={options}
                        placeholder={"请选择"}
                        onChange={(value) => {
                            setDate(addDays(new Date(), parseInt(value)))
                            setPresetValue(value);
                        }}
                    />
                    <div className="rounded-md border">
                        { calendar}
                    </div>
                </> : calendar
            }
        </PopoverContent>
    </Popover>;
});
