import {
    Form as UIForm,
    FormControl,
    FormDescription,
    FormField,
    FormItem as UIFormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import {ControllerRenderProps, DefaultValues, SubmitHandler, useForm, UseFormReturn} from "react-hook-form"
import {
    FC,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    cloneElement,
    FormHTMLAttributes,
} from "react";
import type { Control, FieldValues, WatchObserver } from "react-hook-form";
import { useMemo, Children } from "react";
import isObject from "lodash/isObject";
import {ZodType} from "zod";
import {cn} from "@/lib/utils";

export interface RenderProps extends ControllerRenderProps {
    placeholder?: string;
}

export interface FieldItem extends PropsWithChildren {
    name: string;
    label: string | ReactNode
    description?: string;
    control?: Control<FieldValues>;
    className?: string;
}

export type FormProps<T> = FormHTMLAttributes<HTMLFormElement> & {
    schema?: ZodType<T>;
    defaultValues?: DefaultValues<T>
    onSubmit?: SubmitHandler<FieldValues>;
    className?: string;
    onValuesChange?: WatchObserver<FieldValues>,
    formRef?: UseFormReturn<FieldValues>;
    stopPropagation?: boolean;
}

export const FormItem: FC<FieldItem> = (props) => {
    const render = (field: ControllerRenderProps) => {
        if(Children.count(props.children) === 1) {
            const ele = (props.children as ReactElement);
            return cloneElement(ele, {
                ...ele.props,
                ...field,
                value: field.value === 0 ? 0 : (field.value || ''), // a component is changing an uncontrolled input to be controlled
            })
        }
        return props.children;
    };

    return <FormField
        control={props.control}
        name={props.name}
        render={(p) => {
            const { field } = p;
            return <UIFormItem className={props.className}>
                { props.label ? <FormLabel>{ props.label }</FormLabel> : null }
                <FormControl>
                    <div>
                        { render(field) }
                    </div>
                </FormControl>
                { props.description ? <FormDescription>{props.description}</FormDescription> : null }
                <FormMessage />
            </UIFormItem>
        }}
    />;
}

export const Form = function <T> (props: FormProps<T>) {
    const {
        schema = null,
        defaultValues,
        onSubmit = () => {},
        className,
        onValuesChange,
        stopPropagation = true,
        ...rest
    } = props;

    const form = useForm({
        resolver: zodResolver(schema!),
        defaultValues: defaultValues,
    })
    form.watch(onValuesChange!);

    const children = useMemo<ReactNode>(() => {
        return Children.map(props.children, (child) => {
            if(isObject(child) && ('type' in (child as ReactElement))) {
                const ele = (child as ReactElement);
                if(ele.type === FormItem) {
                    return cloneElement(ele, {
                        ...ele.props,
                        control: form.control
                    })
                }
            }
            return child;
        })
    }, [props.children]);

    return <UIForm {...form}>
        <form
            {...rest}
            onSubmit={(e) => {
                stopPropagation && e.stopPropagation();
                form.handleSubmit(onSubmit)(e);
            }}
            className={cn("space-y-6", className)}
        >
            { children }
        </form>
    </UIForm>
}
