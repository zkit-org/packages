import type { ReactNode } from "react";

import { TableCell, TableRow, type TreeTableProps } from "@easykit/design";
import { ExpandAction } from "./action";
import { DEFAULT_CHILDREN_PROPERTY, DEFAULT_INDENT_WIDTH } from "./config";

export type RenderRowProps<TData> = {
  data: TData[];
  tableProps: TreeTableProps<TData>;
  deep: number;
  expandedKeys: string[];
  onExpand?: (key: string, expanded: boolean) => void;
};

export function renderRow<TData>(props: RenderRowProps<TData>): ReactNode {
  const {
    childrenProperty = DEFAULT_CHILDREN_PROPERTY,
    rowKey,
    columns,
    indentWidth = DEFAULT_INDENT_WIDTH,
  } = props.tableProps;
  const { data, deep, expandedKeys, onExpand } = props;

  return data?.map((item) => {
    const children = item[childrenProperty as keyof TData] as TData[];
    const hasChildren = children && children.length > 0;
    const key = item[rowKey as keyof TData] as string;
    const expanded = expandedKeys.includes(key);
    return [
      <TableRow key={key}>
        {columns.map((col, index) => {
          const content = col.render ? col.render(item[col.dataKey], item) : String(item[col.dataKey]);
          return (
            <TableCell className={col.className} key={col.dataKey as string}>
              {index === 0 ? (
                <div className="flex items-center justify-start">
                  <div
                    className="mr-2"
                    style={{
                      paddingLeft: (indentWidth + 8) * deep,
                    }}
                  >
                    <ExpandAction enable={hasChildren} expanded={expanded} onClick={() => onExpand?.(key, !expanded)} />
                  </div>
                  {content}
                </div>
              ) : (
                content
              )}
            </TableCell>
          );
        })}
      </TableRow>,
      expanded
        ? renderRow({
            ...props,
            data: children,
            deep: deep + 1,
          })
        : null,
    ];
  });
}
