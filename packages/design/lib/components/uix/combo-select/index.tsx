import { Popover, PopoverContent, PopoverTrigger } from "@easykit/design/components/ui/popover";
import { Button } from "@easykit/design/components/ui/button";
import {FC, forwardRef, PropsWithRef, ReactNode, useContext, useEffect, useMemo, useRef, useState} from "react";
import {CaretSortIcon, CheckIcon, Cross2Icon, PlusCircledIcon} from "@radix-ui/react-icons";
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
import get from "lodash/get";
import {Skeleton} from "@easykit/design/components/ui/skeleton";
import { DebouncedFunc } from "lodash";

export interface ComboSelectOptionProps<Data> {
    value: string;
    label: ReactNode;
    raw?: Data;
}

type SearchFunction = (value: string) => Promise<void> | void;

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
    search?: boolean;
    onSearch?: SearchFunction | DebouncedFunc<SearchFunction>;
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
        search = false,
        onSearch = async (value: string) => {}
    } = props;

    const config = useContext(UIXContext);
    const empty = props.empty || get(config.locale, "ComboSelect.empty");
    const clearText = props.clearText || get(config.locale, "ComboSelect.clearText");

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

    const showClear = useMemo(() => clearable &&  (selectedValues.length > 0 || valueState), [clearable, selectedValues, valueState])

    const placeholderDom = <span className={"font-normal text-muted-foreground"}>{placeholder}</span>

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                ref={containerRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                    "justify-between min-w-[150px] items-center h-9 py-1 px-2 group align-middle hover:bg-secondary/40",
                    multiple ? "border-dashed" : null,
                    multiple && selectedValues && selectedValues.length ? "h-auto pb-0" : null,
                    className,
                )}
            >
                <div className={"flex-1 flex items-start justify-start flex-wrap"}>
                    {
                        multiple ? <>
                            {
                                selectedValues && selectedValues.length ? <>
                                    <span />
                                    {
                                        selectedValues.map((v) => {
                                            const label = options.find((option) => option.value === v)?.label;
                                            return label ? <div className={"bg-secondary py-[3px] px-2 rounded mb-1 mr-1"} key={v}>{label}</div> : null
                                        })
                                    }
                                </> : <div className={"flex items-center"}>
                                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                                    { placeholderDom }
                                </div>
                            }
                        </> : <>
                            <span>{valueState ? options.find((option) => option.value === valueState)?.label : placeholderDom}</span>
                        </>
                    }
                </div>
                <div className={"flex justify-center items-center shrink-0 opacity-50 ml-2"}>
                    {
                        loading ? <Spin /> : <>
                            { multiple ? null : <CaretSortIcon className={cn("h-4 w-4 block", showClear ? "group-hover:hidden" : "")} /> }
                            <Cross2Icon
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const v = multiple ? [] : "";
                                    setSelectedValues([]);
                                    setValueState('');
                                    onChange(v);
                                    onSearch?.("");
                                }}
                                className={cn("h-4 w-4 hidden", showClear ? "group-hover:block" : "")}
                            />
                        </>
                    }
                </div>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" style={{width: size.width}}>
            <Command filter={props.filter}>
                { search ? <CommandInput onValueChange={onSearch} placeholder={searchPlaceholder} className="h-9" /> : null }
                {
                    loading ? <div className={"px-2"}>
                        <Skeleton className={"w-full h-6 my-2"} />
                        <Skeleton className={"w-full h-6 my-2"} />
                        <Skeleton className={"w-full h-6 my-2"} />
                    </div> : <CommandEmpty>{ empty }</CommandEmpty>
                }
                <CommandList>
                    {
                        !loading ? options.map((option) => {
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
                                        const v = currentValue; // currentValue === valueState ? "" : currentValue;
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
                        }) : null
                    }
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
})
