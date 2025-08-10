import type { ButtonProps } from '../button'
import { Checkbox } from '../checkbox'

import { type ForwardedRef, forwardRef, type ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CaretSortIcon, CheckIcon, Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import type { DebouncedFunc } from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import remove from 'lodash/remove'
import { Button } from '@easykit/design/components/ui/button'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@easykit/design/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@easykit/design/components/ui/popover'
import { Skeleton } from '@easykit/design/components/ui/skeleton'
import { UIXContext } from '@easykit/design/components/uix/config-provider'
import { Spin } from '@easykit/design/components/uix/spin'
import { useSize } from '@easykit/design/hooks/resize'
import { cn } from '@easykit/design/lib'

export interface ComboSelectOptionProps<Data> {
  value: string
  label: ReactNode
  raw?: Data
}

type SearchFunction = (value: string) => Promise<void> | void

export interface ComboSelectProps<Data = unknown> {
  options?: ComboSelectOptionProps<Data>[]
  placeholder?: string
  searchPlaceholder?: string
  empty?: ReactNode
  className?: string
  onChange?: (value: string | string[]) => void
  value?: string | string[]
  loading?: boolean
  filter?: (value: string, search: string, option?: ComboSelectOptionProps<Data>) => boolean
  multiple?: boolean
  clearable?: boolean
  clearText?: string
  limit?: number
  search?: boolean
  onSearch?: SearchFunction | DebouncedFunc<SearchFunction>
  initLoading?: boolean
}

function SelectedLabels({
  selectedValues,
  options,
  placeholderDom,
}: {
  selectedValues: string[]
  // biome-ignore lint/suspicious/noExplicitAny: <options>
  options: ComboSelectOptionProps<any>[]
  placeholderDom: ReactNode
}) {
  if (selectedValues?.length) {
    return (
      <>
        {selectedValues.map((v) => {
          // biome-ignore lint/suspicious/noExplicitAny: <options>
          const label = options.find((option: any) => option.value === v)?.label || v
          return label ? (
            <div className="my-0.5 mr-1 rounded bg-secondary px-2 py-[3px] text-sm" key={v}>
              {label}
            </div>
          ) : null
        })}
      </>
    )
  }
  return (
    <div className="flex items-center">
      <PlusCircledIcon className="mr-2 h-4 w-4" />
      {placeholderDom}
    </div>
  )
}

function handleSelect(
  optionValue: string,
  multiple: boolean,
  isSelected: boolean,
  selectedValues: string[],
  limit: number,
  setSelectedValues: (v: string[]) => void,
  setValueState: (v: string) => void,
  onChange: (v: string | string[]) => void,
  setOpen: (v: boolean) => void
) {
  if (multiple) {
    if (isSelected) {
      remove(selectedValues, (item) => item === optionValue)
    } else {
      if (selectedValues.length >= limit) {
        return
      }
      selectedValues.push(optionValue)
    }
    const v = cloneDeep(selectedValues)
    setSelectedValues(v)
    onChange?.(v)
  } else {
    const v = optionValue
    setValueState(v)
    onChange?.(v)
    setOpen(false)
  }
}

function ComboSelectCommandList<Data>({
  loading,
  options,
  selectedValues,
  multiple,
  limit,
  setSelectedValues,
  setValueState,
  onChange,
  value,
  setOpen,
}: {
  loading: boolean
  options: ComboSelectOptionProps<Data>[]
  selectedValues: string[]
  multiple: boolean
  limit: number
  setSelectedValues: (v: string[]) => void
  setValueState: (v: string) => void
  onChange?: (v: string | string[]) => void
  onSearch?: (v: string) => void
  value: string | string[]
  setOpen: (v: boolean) => void
}) {
  return (
    <CommandList>
      {loading
        ? null
        : // biome-ignore lint/suspicious/noExplicitAny: <options>
          options.map((option: any) => {
            const isSelected = selectedValues.includes(option.value)
            return (
              <CommandItem
                key={option.value}
                onSelect={() =>
                  handleSelect(
                    option.value,
                    multiple,
                    isSelected,
                    selectedValues,
                    limit,
                    setSelectedValues,
                    setValueState,
                    onChange!,
                    setOpen
                  )
                }
                value={option.value}
              >
                {multiple ? <Checkbox checked={isSelected} /> : null}
                {option.label}
                {multiple ? null : (
                  <CheckIcon className={cn('ml-auto h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                )}
              </CommandItem>
            )
          })}
    </CommandList>
  )
}

type ComboSelectButtonProps<Data> = {
  multiple: boolean
  selectedValues: string[]
  className?: string
  placeholderDom: ReactNode
  options: ComboSelectOptionProps<Data>[]
  valueState?: string | string[]
  loading: boolean
  showClear: boolean
  setSelectedValues: (v: string[]) => void
  setValueState: (v: string) => void
  onChange?: (v: string | string[]) => void
  onSearch?: (v: string) => void
  initLoading: boolean
} & Omit<ButtonProps, 'onChange'>

const ComboSelectButton = forwardRef(
  <Data,>(props: ComboSelectButtonProps<Data>, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
    const {
      multiple,
      selectedValues,
      className,
      placeholderDom,
      options,
      valueState,
      loading,
      initLoading,
      showClear,
      setSelectedValues,
      setValueState,
      onChange,
      // onSearch,
      onClick,
    } = props
    const elementRef = forwardedRef

    return (
      <Button
        className={cn(
          'group h-9 min-w-[150px] items-center justify-between px-2 py-1 align-middle hover:bg-secondary/40',
          multiple ? 'border-dashed' : null,
          multiple && selectedValues && selectedValues.length ? 'h-auto' : null,
          className
        )}
        onClick={onClick}
        ref={elementRef}
        type="button"
        variant="outline"
      >
        <div className={cn('flex min-h-7.5 flex-1 flex-wrap items-center justify-start', multiple ? '-my-0.5' : null)}>
          {initLoading ? (
            <Skeleton className="h-6 w-full min-w-20" />
          ) : multiple ? (
            <SelectedLabels options={options} placeholderDom={placeholderDom} selectedValues={selectedValues} />
          ) : (
            <span>
              {valueState ? options.find((option) => option.value === valueState)?.label || valueState : placeholderDom}
            </span>
          )}
        </div>
        <div className="ml-2 flex w-4 shrink-0 items-center justify-center opacity-50">
          {loading || initLoading ? (
            <Spin />
          ) : (
            <>
              {multiple ? null : (
                <CaretSortIcon className={cn('block h-4 w-4', showClear ? 'group-hover:hidden' : '')} />
              )}
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  const v = multiple ? [] : ''
                  setSelectedValues([])
                  setValueState('')
                  onChange?.(v)
                  // onSearch?.('')
                }}
              >
                <Cross2Icon className={cn('hidden h-4 w-4', showClear ? 'group-hover:block' : '')} />
              </div>
            </>
          )}
        </div>
      </Button>
    )
  }
)

export function ComboSelect<Data = unknown>(props: ComboSelectProps<Data>) {
  const {
    options = [],
    placeholder,
    searchPlaceholder,
    className,
    onChange,
    value,
    loading = false,
    multiple = false,
    clearable = true,
    limit = Number.MAX_VALUE,
    search = false,
    onSearch,
    initLoading = false,
    filter = (value, search) => value.includes(search),
  } = props

  const config = useContext(UIXContext)
  const empty = props.empty || get(config.locale, 'ComboSelect.empty')

  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const [valueState, setValueState] = useState<string | string[] | undefined>(value)
  const [selectedValues, setSelectedValues] = useState<string[]>(
    multiple ? ((value || []) as string[]).map((v: string) => `${v || ''}`) : value ? [`${value || ''}`] : []
  )
  const size = useSize(containerRef)

  useEffect(() => {
    if (multiple) {
      setSelectedValues(
        multiple ? ((value || []) as string[]).map((v: string) => `${v || ''}`) : value ? [`${value || ''}`] : []
      )
    } else {
      setValueState(value)
    }
  }, [value, multiple])

  const showClear = useMemo<boolean>(
    () => !!(clearable && (selectedValues.length > 0 || valueState)),
    [clearable, selectedValues, valueState]
  )

  const placeholderDom = <span className="font-normal text-muted-foreground">{placeholder}</span>

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <ComboSelectButton
          className={className}
          initLoading={initLoading}
          loading={loading}
          multiple={multiple}
          onChange={onChange}
          onSearch={onSearch}
          options={options}
          placeholderDom={placeholderDom}
          ref={containerRef}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          setValueState={setValueState}
          showClear={showClear}
          valueState={valueState}
        />
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: size.width }}>
        <Command
          filter={(value, search) =>
            filter(
              value,
              search,
              options.find((option) => option.value === value)
            )
              ? 1
              : 0
          }
        >
          {search ? <CommandInput className="h-9" onValueChange={onSearch} placeholder={searchPlaceholder} /> : null}
          {loading ? (
            <div className="px-2">
              <Skeleton className="my-2 h-6 w-full" />
              <Skeleton className="my-2 h-6 w-full" />
              <Skeleton className="my-2 h-6 w-full" />
            </div>
          ) : (
            <CommandEmpty>{empty}</CommandEmpty>
          )}
          <ComboSelectCommandList
            limit={limit}
            loading={loading}
            multiple={multiple}
            onChange={onChange}
            onSearch={onSearch}
            options={options}
            selectedValues={selectedValues}
            setOpen={setOpen}
            setSelectedValues={setSelectedValues}
            setValueState={setValueState}
            value={value || ''}
          />
        </Command>
      </PopoverContent>
    </Popover>
  )
}
