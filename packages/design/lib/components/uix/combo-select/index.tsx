import { Popover, PopoverContent, PopoverTrigger } from "@easykit/design/components/ui/popover";
import { Button } from "@easykit/design/components/ui/button";
import {FC, forwardRef, PropsWithRef, ReactNode, useContext, useEffect, useRef, useState} from "react";
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
    Command,
    CommandEmpty, CommandGroup,
    CommandInput,
    CommandItem,
    CommandList, CommandSeparator
} from "@easykit/design/components/ui/command";
import { cn } from "@easykit/design/lib";
import { Spin } from "@easykit/design/components/uix/spin";
import remove from 'lodash/remove';
import cloneDeep from "lodash/cloneDeep";
import {useSize} from "@easykit/design/components/hooks/resize";
import {UIXContext} from "@easykit/design/components/uix/config-provider";

export interface ComboSelectOptionProps<Data> {
    value: string;
    label: ReactNode;
    raw?: Data;
}

export interface ComboSelectProps extends PropsWithRef<any>{
    options?: ComboSelectOptionProps<any>[];
    placeholder?: string;
    searchPlaceholder?: string;
    empty?: ReactNode;
    className?: string;
    onChange?: (value: string|string[]) => void;
    value?: any;
    loading?: boolean;
    filter?: (value: string, search: string) => number;
    multiple?: boolean;
    clearable?: boolean;
    clearText?: string;
    limit?: number;
}

export const ComboSelect: FC<ComboSelectProps> = forwardRef((props, ref) => {
    const {
        options = [],
        placeholder,
        searchPlaceholder,
        className,
        onChange = (v: string|string[]) => {},
        value,
        loading = false,
        multiple = false,
        clearable = true,
        limit = Number.MAX_VALUE,
    } = props;

    const config = useContext(UIXContext);
    const empty = props.empty || config.locale.ComboSelect.empty;
    const clearText = props.clearText || config.locale.ComboSelect.clearText;

    const [open, setOpen] = useState(false)
    const containerRef = useRef(null);
    const [valueState, setValueState] = useState(value);
    const [selectedValues, setSelectedValues] = useState<string[]>(multiple ? (value || []).map((v: any) => `${v || ''}`) : (value ? [`${value || ''}`] : []));
    const size = useSize(containerRef);

    useEffect(() => {
        if(multiple) {
            setSelectedValues(multiple ? (value || []).map((v: any) => `${v || ''}`) : (value ? [`${value || ''}`] : []))
        }else{
            setValueState(value);
        }
    }, [value, multiple]);

    const placeholderDom = <span className={"font-normal text-muted-foreground"}>{placeholder}</span>

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                ref={containerRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                    "justify-between min-w-[150px] items-center h-9 py-1",
                    multiple ? "border-dashed justify-start flex-wrap" : null,
                    multiple && selectedValues && selectedValues.length ? "p-1 py-0.5 pb-1 space-x-1 space-y-0.5 h-auto" : null,
                    className,
                )}
                disabled={loading}
            >
                {
                    loading ? <Spin /> : <>
                        {
                            multiple ? <>
                                {
                                    selectedValues && selectedValues.length ? <>
                                        <span />
                                        {
                                            selectedValues.map((v) => {
                                                const label = options.find((option) => option.value === v)?.label;
                                                return label ? <div className={"bg-secondary py-[3px] px-2 rounded"} key={v}>{label}</div> : null
                                            })
                                        }
                                    </> : <>
                                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                                        { placeholderDom }
                                    </>
                                }
                            </> : <>
                                <span>{valueState ? options.find((option) => option.value === valueState)?.label : placeholderDom}</span>
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </>
                        }
                    </>
                }
            </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" style={{width: size.width}}>
            <Command filter={props.filter}>
                <CommandInput placeholder={searchPlaceholder} className="h-9" />
                <CommandEmpty>{ empty }</CommandEmpty>
                <CommandList>
                    {
                        options.map((option) => {
                            const isSelected = selectedValues.includes(option.value)
                            return <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(cv) => {
                                    const currentValue = option.value;
                                    if(multiple) {
                                        if(isSelected) {
                                            remove(selectedValues, (item) => item === currentValue);
                                        }else{
                                            if(selectedValues.length >= limit) {
                                                return;
                                            }
                                            selectedValues.push(currentValue);
                                        }
                                        const v = cloneDeep(selectedValues);
                                        setSelectedValues(v);
                                        onChange(v);
                                    }else{
                                        const v = currentValue === valueState ? "" : currentValue;
                                        setValueState(v);
                                        onChange(v);
                                        setOpen(false)
                                    }
                                }}
                            >
                                {
                                    multiple ? <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <CheckIcon className={cn("h-4 w-4")} />
                                    </div> : null
                                }
                                { option.label }
                                {
                                    !multiple ? <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    /> : null
                                }
                            </CommandItem>
                        })
                    }
                </CommandList>
                {
                    clearable &&  (selectedValues.length > 0 || valueState) ? (
                        <>
                            <CommandSeparator />
                            <CommandGroup>
                                <CommandItem
                                    onSelect={() => {
                                        const v = multiple ? [] : "";
                                        setSelectedValues([]);
                                        setValueState('');
                                        onChange(v);
                                    }}
                                    className="justify-center text-center"
                                >
                                    { clearText }
                                </CommandItem>
                            </CommandGroup>
                        </>
                    ) : null
                }
            </Command>
        </PopoverContent>
    </Popover>
})
