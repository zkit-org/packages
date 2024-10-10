import {PropsWithChildren, FC, cloneElement, ReactElement, useContext} from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form"
import type {Control} from "react-hook-form";
import {Button} from "@/components/uix/button";
import {UIXContext} from "@/components/uix/config-provider";
import pick from "lodash/pick";

export interface FilterItemProps {
    field: string;
    render: () => ReactElement;
    label?: string;
}

export interface FiltersProps extends PropsWithChildren{
    items?: FilterItemProps[];
    defaultValues?: any;
    query?: any;
    loading?: boolean;
    load?: (params?: any) => Promise<any>;
    searchText?: string;
    resetText?: string;
}

const renderItem = (item: FilterItemProps, form: {control: Control}) => {
    const ele = item.render();

    return <div key={item.field} className={"m-2 my-1"}>
        <div className={"text-sm text-muted-foreground mb-1"}>{ item.label }</div>
        <div>
            <Controller
                name={item.field}
                control={form.control}
                render={({ field }) => cloneElement(ele, {...ele.props, ...field, value: field.value})}
            />
        </div>
    </div>
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
    const searchText = props.searchText || config.locale.Filters.searchText;
    const resetText = props.resetText || config.locale.Filters.resetText;

    const onSubmit: SubmitHandler<any> = (data) => {
        load && load({
            ...(data || {}),
            page: 1
        }).then();
    }

    return <div className={"relative"}>
        <form
            onSubmit={handleSubmit(onSubmit)}>
            <div className={"flex justify-start items-end -mx-2 flex-wrap"}>
                { items.map((item) => renderItem(item, {control})) }
                {
                    items && items.length ? <div className={"m-2 my-1 flex justify-start items-center flex-1"}>
                        <Button disabled={loading} type={"submit"}>{searchText}</Button>
                        <Button disabled={loading} type={"reset"} className={"ml-2"} variant={"secondary"} onClick={() => {
                            load && load({
                                ...(defaultValues || {}),
                                page: 1
                            }).then();
                            reset(defaultValues);
                        }}>{resetText}</Button>
                    </div> : null
                }
            </div>
        </form>
        { loading ? <div className={"absolute top-0 right-0 bottom-0 left-0 bg-white/50"} /> : null }
    </div>
}
