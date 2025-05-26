import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Form as UIForm,
  FormItem as UIFormItem,
} from '@easykit/design/components/ui/form'
import { cn } from '@easykit/design/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import isObject from 'lodash/isObject'
import {
  type FC,
  type FormHTMLAttributes,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  type Ref,
  cloneElement,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Children, useMemo } from 'react'
import {
  type ControllerRenderProps,
  type DefaultValues,
  type SubmitHandler,
  type UseFormReturn,
  useForm,
} from 'react-hook-form'
import type { Control, FieldValues, WatchObserver } from 'react-hook-form'
import type { ZodType } from 'zod'

export interface RenderProps extends ControllerRenderProps {
  placeholder?: string
}

export interface FieldItem extends PropsWithChildren {
  name: string
  label: string | ReactNode
  description?: string
  control?: Control<FieldValues>
  className?: string
}

export type FormProps<T> = FormHTMLAttributes<HTMLFormElement> & {
  schema?: ZodType<T>
  defaultValues?: DefaultValues<T>
  onSubmit?: SubmitHandler<FieldValues>
  className?: string
  onValuesChange?: WatchObserver<FieldValues>
  stopPropagation?: boolean
}

export const FormItem: FC<FieldItem> = (props) => {
  const render = (field: ControllerRenderProps) => {
    if (Children.count(props.children) === 1) {
      const ele = props.children as ReactElement
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const onChangeOrigin = (ele as any).props.onChange
      const onChange = field.onChange
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const onChangeWrap = (e: any) => {
        onChange(e)
        onChangeOrigin?.(e)
      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return cloneElement<any>(ele, {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        ...(ele as any).props,
        ...field,
        onChange: onChangeWrap,
        value: field.value === 0 ? 0 : field.value || '', // a component is changing an uncontrolled input to be controlled
      })
    }
    return props.children
  }

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={(p) => {
        const { field } = p
        return (
          <UIFormItem className={classNames('flex flex-col', props.className)}>
            {props.label ? <FormLabel>{props.label}</FormLabel> : null}
            <FormControl>{render(field)}</FormControl>
            {props.description ? <FormDescription>{props.description}</FormDescription> : null}
            <FormMessage />
          </UIFormItem>
        )
      }}
    />
  )
}

export const Form = forwardRef(<T,>(props: FormProps<T>, ref: Ref<UseFormReturn | undefined>) => {
  const { schema = null, defaultValues, onSubmit, className, onValuesChange, stopPropagation = true, ...rest } = props

  const form = useForm({
    resolver: zodResolver(schema!),
    defaultValues: defaultValues,
  })
  form.watch(onValuesChange!)

  const children = useMemo<ReactNode>(() => {
    return Children.map(props.children, (child) => {
      if (isObject(child) && 'type' in (child as ReactElement)) {
        const ele = child as ReactElement
        if (ele.type === FormItem) {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          return cloneElement<any>(ele, {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            ...(ele as any).props,
            control: form.control,
          })
        }
      }
      return child
    })
  }, [form.control, props.children])

  useImperativeHandle(ref, () => form, [form])

  return (
    <UIForm {...form}>
      <form
        {...rest}
        onSubmit={(e) => {
          stopPropagation && e.stopPropagation()
          if (onSubmit) {
            form.handleSubmit(onSubmit)(e)
          }
        }}
        className={cn('space-y-4', className)}
      >
        {children}
      </form>
    </UIForm>
  )
})
