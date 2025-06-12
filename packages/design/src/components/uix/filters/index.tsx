import {Button} from "@easykit/design/components/uix/button";
import {UIXContext} from "@easykit/design/components/uix/config-provider";
import get from 'lodash/get'
import pick from "lodash/pick";
import { type FC, type PropsWithChildren, type ReactElement, cloneElement, useContext } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import type { Control } from 'react-hook-form'

export interface FilterItemProps {
  field: string
  render: () => ReactElement
  label?: string
}

export interface FiltersProps extends PropsWithChildren {
  items?: FilterItemProps[]
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultValues?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  query?: any
  loading?: boolean
  load?: (params?: unknown) => Promise<unknown> | unknown
  searchText?: string
  resetText?: string
}

const renderItem = (item: FilterItemProps, form: { control: Control }) => {
  const ele = item.render();

  return (
    <div key={item.field} className="m-2 my-1">
      <div className="mb-1 text-muted-foreground text-sm">{item.label}</div>
      <div>
        <Controller
          name={item.field}
          control={form.control}
          render={({ field }) =>
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            cloneElement<any>(ele, {
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              ...(ele as any).props,
              ...field,
              value: field.value === 0 ? 0 : field.value || '', // a component is changing an uncontrolled input to be controlled
            })
          }
        />
      </div>
    </div>
  )
}

export const Filters: FC<FiltersProps> = (props) => {
  const {
    items = [],
    defaultValues = null,
    loading,
    load,
    query,
  } = props;
  const fields = items.map((item) => item.field);
  const {
    reset,
    control,
    handleSubmit
  } = useForm({
    defaultValues: pick(query, fields),
  })

  const config = useContext(UIXContext);
  const searchText = props.searchText || get(config.locale, "Filters.searchText");
  const resetText = props.resetText || get(config.locale, "Filters.resetText");

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onSubmit: SubmitHandler<any> = (data) => {
    load?.({
      ...pick(data, fields),
      page: 1,
    })
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="-mx-2 flex flex-wrap items-end justify-start">
          {items.map((item) => renderItem(item, { control }))}
          {items?.length ? (
            <div className="m-2 my-1 flex flex-1 items-center justify-start">
              <Button disabled={loading} type="submit">
                {searchText}
              </Button>
              <Button
                disabled={loading}
                type="reset"
                className="ml-2"
                variant="secondary"
                onClick={() => {
                  const filteredDefaultValues = pick(defaultValues, fields)
                  load?.({
                    ...filteredDefaultValues,
                    page: 1,
                  })
                  reset(filteredDefaultValues)
                }}
              >
                {resetText}
              </Button>
            </div>
          ) : null}
        </div>
      </form>
      {loading ? <div className="dark:!bg-black/5 absolute top-0 right-0 bottom-0 left-0 bg-white/50" /> : null}
    </div>
  )
}
