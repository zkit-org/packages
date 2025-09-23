import { Children, cloneElement, type FC, type PropsWithChildren, type ReactElement } from "react";

import { cn } from "@easykit/design/lib";

export interface BreadcrumbsItemProps extends PropsWithChildren {
  last?: boolean;
}

export const BreadcrumbsItem: FC<BreadcrumbsItemProps> = (props) => {
  const { last = false } = props;
  return (
    <div className="text-muted-foreground">
      {props.children}
      {last ? null : <span className="mx-2">/</span>}
    </div>
  );
};

export interface BreadcrumbsProps extends PropsWithChildren {
  className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const { children, className } = props;

  const size = Children.count(children);

  return (
    <div className={cn("my-2 flex items-center justify-start", className)}>
      {Children.map(children, (child, index) => {
        const ele = child as ReactElement;
        if (!ele) return null;
        // biome-ignore lint/suspicious/noExplicitAny: <cloneElement>
        return cloneElement<any>(ele, { ...(ele as any).props, last: index === size - 1 });
      })}
    </div>
  );
};
