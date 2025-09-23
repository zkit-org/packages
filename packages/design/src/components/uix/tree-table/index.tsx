import { type ReactNode, useCallback, useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import remove from "lodash/remove";
import uniq from "lodash/uniq";

import { Empty, type EmptyProps, Spin, Table, TableBody, TableHead, TableHeader, TableRow } from "@easykit/design";
import { renderRow } from "./utils";

export type TreeTableColumn<TData> = {
  className?: string;
  headerClassName?: string;
  formatters?: string[];
  title: ReactNode;
  dataKey: keyof TData;
  // biome-ignore lint/suspicious/noExplicitAny: <value>
  render?: (value: any, data: TData) => ReactNode;
};

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
  emptyProps?: EmptyProps;
};

export function TreeTable<TData>(props: TreeTableProps<TData>) {
  const { columns, data, showHeader = true, defaultExpandedKeys = [], loading = false, emptyProps } = props;
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys);

  useEffect(() => {
    setExpandedKeys(props.expandedKeys ?? []);
  }, [props.expandedKeys]);

  const onExpand = useCallback(
    (key: string, expanded: boolean) => {
      const keys = cloneDeep(expandedKeys);
      if (expanded) {
        setExpandedKeys(uniq([...keys, key]));
      } else {
        setExpandedKeys(remove(keys, (item) => item !== key));
      }
    },
    [expandedKeys],
  );

  return (
    <div className="relative">
      <Table>
        {showHeader && (
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead className={col.headerClassName} key={col.dataKey as string}>
                  {col.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
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
      {loading ? (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-white/50">
          <Spin />
        </div>
      ) : data && data.length > 0 ? null : (
        <Empty {...(emptyProps ?? {})} />
      )}
    </div>
  );
}
