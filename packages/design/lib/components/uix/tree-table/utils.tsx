import {TableCell, TableRow, TreeTableProps} from "@easykit/design";
import {ReactNode} from "react";
import {ExpandAction} from "@easykit/design/components/uix/tree-table/action";
import {DEFAULT_CHILDREN_PROPERTY, DEFAULT_INDENT_WIDTH} from "@easykit/design/components/uix/tree-table/config";

export type RenderRowProps<TData> = {
  data: TData[];
  tableProps: TreeTableProps<TData>;
  deep: number;
  expandedKeys: string[];
  onExpand?: (key: string, expanded: boolean) => void;
}

export function renderRow<TData>(props: RenderRowProps<TData>): ReactNode {
  const {
    childrenProperty = DEFAULT_CHILDREN_PROPERTY,
    rowKey, columns,
    indentWidth = DEFAULT_INDENT_WIDTH,
  } = props.tableProps;
  const {
    data, deep,
    expandedKeys,
    onExpand,
  } = props;

  return data?.map((item) => {
    const children = item[childrenProperty as keyof TData] as TData[];
    const hasChildren = children && children.length > 0;
    const key = item[rowKey as keyof TData] as string;
    const expanded = expandedKeys.includes(key);
    return [
      <TableRow key={key}>
        {columns.map((col, index) => {
          const content = col.render ? col.render(item[col.dataKey], item) : <>{item[col.dataKey]}</>;
          return <TableCell key={col.dataKey as string} className={col.className}>
            {
              index === 0 ? <div className={"flex justify-start items-center"}>
                <div
                  className={"mr-2"}
                  style={{
                    paddingLeft: (indentWidth + 8) * deep,
                  }}
                >
                  <ExpandAction
                    onClick={() => onExpand?.(key, !expanded)}
                    enable={hasChildren}
                    expanded={expanded}
                  />
                </div>
                {content}
              </div> : content
            }
          </TableCell>;
        })}
      </TableRow>,
      expanded ? renderRow({
        ...props,
        data: children,
        deep: deep + 1,
      }) : null
    ]
  })
}
