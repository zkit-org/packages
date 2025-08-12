import {
  Children,
  cloneElement,
  type FC,
  type FormHTMLAttributes,
  forwardRef,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  type Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import isObject from 'lodash/isObject'
import type { Control, FieldValues, WatchObserver } from 'react-hook-form'
import {
  type ControllerRenderProps,
  type DefaultValues,
  type SubmitHandler,
  type UseFormReturn,
  useForm as useFormHook,
} from 'react-hook-form'
import type { ZodType } from 'zod'
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

export interface RenderProps extends ControllerRenderProps {
  placeholder?: string
}

export interface FieldItem<T extends FieldValues> extends PropsWithChildren {
  name: string
  label?: string | ReactNode
  description?: string
  control?: Control<T>
  className?: string
}

export type FormInstance<T extends FieldValues> = UseFormReturn<T> & {
  _setForm?: (ref: UseFormReturn<T> | null) => void
  submit: () => void
}

export type FormProps<T extends FieldValues> = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  schema?: ZodType<T>
  defaultValues?: DefaultValues<T>
  onSubmit?: SubmitHandler<T>
  className?: string
  onValuesChange?: WatchObserver<T>
  stopPropagation?: boolean
  form?: FormInstance<T>
}

// biome-ignore lint/suspicious/noExplicitAny: <props>
export const FormItem: FC<FieldItem<any>> = (props) => {
  const render = (field: ControllerRenderProps) => {
    if (Children.count(props.children) === 1) {
      const ele = props.children as ReactElement
      // biome-ignore lint/suspicious/noExplicitAny: <props>
      const onChangeOrigin = (ele as any).props.onChange
      const onChange = field.onChange
      // biome-ignore lint/suspicious/noExplicitAny: <e>
      const onChangeWrap = (e: any) => {
        onChange(e)
        onChangeOrigin?.(e)
      }
      // biome-ignore lint/suspicious/noExplicitAny: <cloneElement>
      return cloneElement<any>(ele, {
        // biome-ignore lint/suspicious/noExplicitAny: <props>
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

function FormInner<T extends FieldValues>(props: FormProps<T>, ref: Ref<FormInstance<T> | undefined>) {
  const {
    schema = null,
    defaultValues,
    onSubmit,
    className,
    onValuesChange,
    stopPropagation = true,
    form: formInstance,
    ...rest
  } = props

  const form = useFormHook<T>({
    resolver: zodResolver(schema!),
    defaultValues: defaultValues,
  })
  form.watch(onValuesChange!)

  const innerInstance = useMemo<FormInstance<T>>(() => {
    return {
      ...form,
      submit: () => {
        if (onSubmit) {
          form.handleSubmit(onSubmit)()
        }
      },
    }
  }, [form, onSubmit])

  useEffect(() => {
    if (formInstance) {
      formInstance._setForm?.(innerInstance)
    }
  }, [formInstance, innerInstance])

  const children = useMemo<ReactNode>(() => {
    return Children.map(props.children, (child) => {
      if (isObject(child) && 'type' in (child as ReactElement)) {
        const ele = child as ReactElement
        if (ele.type === FormItem) {
          // biome-ignore lint/suspicious/noExplicitAny: <cloneElement>
          return cloneElement<any>(ele, {
            // biome-ignore lint/suspicious/noExplicitAny: <props>
            ...(ele as any).props,
            control: form.control,
          })
        }
      }
      return child
    })
  }, [form.control, props.children])

  useImperativeHandle(ref, () => innerInstance, [innerInstance])

  return (
    <UIForm {...form}>
      <form
        {...rest}
        className={cn('space-y-4', className)}
        onSubmit={(e) => {
          console.log('onSubmit', e)
          stopPropagation && e.stopPropagation()
          if (onSubmit) {
            form.handleSubmit(onSubmit)(e)
          }
        }}
      >
        {children}
      </form>
    </UIForm>
  )
}

const useForm = <T extends FieldValues = FieldValues>(): FormInstance<T> => {
  const [form, setForm] = useState<UseFormReturn<T> | null>(null)
  return useMemo(() => {
    return {
      ...(form || ({} as UseFormReturn<T>)),
      _setForm: (form: UseFormReturn<T> | null) => {
        setForm(form)
      },
    } as FormInstance<T>
  }, [form])
}

const useWatch = <T extends FieldValues = FieldValues>(name: string, form: FormInstance<T>) => {
  const [value, setValue] = useState<unknown>(undefined)

  useEffect(() => {
    if (!form?.watch) return

    const subscription = form.watch((data) => {
      const fieldValue = (data as Record<string, unknown>)[name]
      setValue(fieldValue)
    })

    // 初始化时获取一次值
    if (form.getValues) {
      try {
        const currentValue = form.getValues()
        setValue((currentValue as Record<string, unknown>)[name])
      } catch {
        // ignore error
      }
    }

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe()
      }
    }
  }, [form, name])

  return value
}

export const Form = Object.assign(
  forwardRef(FormInner) as <T extends FieldValues>(
    props: FormProps<T> & { ref?: Ref<UseFormReturn<T> | undefined> }
  ) => ReactElement,
  {
    useForm,
    useWatch,
  }
)
