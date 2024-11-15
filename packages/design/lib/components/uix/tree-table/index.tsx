import {
    Spin,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@easykit/design"
import {ReactNode, useCallback, useEffect, useState} from "react";
import {renderRow} from "@easykit/design/components/uix/tree-table/utils";
import uniq from "lodash/uniq";
import remove from "lodash/remove";
import cloneDeep from "lodash/cloneDeep";
import {DEFAULT_CHILDREN_PROPERTY} from "@easykit/design/components/uix/tree-table/config";

export type TreeTableColumn<TData> = {
    className?: string;
    headerClassName?: string;
    formatters?: string[];
    title: ReactNode;
    dataKey: keyof TData;
    render?: (value: any, data: TData) => ReactNode;
}

export type TreeTableProps<TData> = {
    data: TData[];
    columns: TreeTableColumn<TData>[];
    rowKey?: keyof TData;
    childrenProperty?: string;
    showHeader?: boolean;
    indentWidth?: number;
    expandedKeys?: string[];
    defaultExpandedKeys?: string[];
    onExpand?: (expandedKeys: string[]) => void;
    loading?: boolean;
}

export function TreeTable <TData> (props: TreeTableProps<TData>) {
    const {
        columns,
        data,
        showHeader = true,
        defaultExpandedKeys = [],
        loading = false,
    } = props;
    const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys);

    useEffect(() => {
        setExpandedKeys(props.expandedKeys ?? []);
    }, [props.expandedKeys])

    const onExpand = useCallback((key: string, expanded: boolean) => {
        const keys = cloneDeep(expandedKeys)
        if(expanded) {
            setExpandedKeys(uniq([...keys, key]));
        }else{
            setExpandedKeys(remove(keys, (item) => item !== key));
        }
    }, [expandedKeys])

    return <div className={"relative"}>
        <Table>
            {showHeader && <TableHeader>
                <TableRow>
                    {columns.map((col) =>
                        <TableHead key={col.dataKey as string} className={col.headerClassName}>{col.title}</TableHead>)}
                </TableRow>
            </TableHeader>}
            <TableBody>
                {renderRow<TData>({
                    data,
                    tableProps: props,
                    deep: 0,
                    expandedKeys,
                    onExpand,
                })}
            </TableBody>
        </Table>
        { loading ? <div className={"absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-white/50"}><Spin /></div> : null }
    </div>
}
