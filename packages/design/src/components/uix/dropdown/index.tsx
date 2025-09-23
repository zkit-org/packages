import type { FC, MouseEvent, PropsWithChildren, ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@easykit/design/components/ui/dropdown-menu";
import { cn } from "@easykit/design/lib";

type Align = "start" | "center" | "end";
type Side = "top" | "bottom" | "left" | "right";

export type onDropdownMenuClick = (item: DropdownMenuItemProps, e: MouseEvent) => void;
export type onCheckedChange = (item: DropdownMenuItemProps, checked: boolean) => void;

export interface DropdownMenuItemProps {
  label?: ReactNode;
  id: string;
  type: "label" | "separator" | "item" | "checkbox";
  checked?: boolean;
  shortcut?: string;
  disabled?: boolean;
  children?: DropdownMenuItemProps[];
  onItemClick?: onDropdownMenuClick;
  onCheckedChange?: onCheckedChange;
  hidden?: boolean;
}

export interface DropdownProps extends PropsWithChildren {
  items?: DropdownMenuItemProps[];
  className?: string;
  onItemClick?: onDropdownMenuClick;
  onCheckedChange?: onCheckedChange;
  align?: Align;
  side?: Side;
  asChild?: boolean;
  hideOnEmpty?: boolean;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type Callback = {
  onItemClick?: onDropdownMenuClick;
  onCheckedChange?: onCheckedChange;
};

const renderItem = (item: DropdownMenuItemProps, call: Callback) => {
  const clickCall = item.onItemClick || call.onItemClick;
  const checkedCall = item.onCheckedChange || call.onCheckedChange;
  if (item.type === "label") {
    return <DropdownMenuLabel key={item.id}>{item.label}</DropdownMenuLabel>;
  }
  if (item.type === "separator") {
    return <DropdownMenuSeparator key={item.id} />;
  }
  if (item.type === "checkbox") {
    return (
      <DropdownMenuCheckboxItem
        checked={item.checked}
        className="capitalize"
        key={item.id}
        onCheckedChange={(value) => checkedCall?.(item, value)}
      >
        {item.label}
      </DropdownMenuCheckboxItem>
    );
  }
  if (item.children?.length) {
    return (
      <DropdownMenuSub key={item.id}>
        <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>{item.children.map((child) => renderItem(child, call))}</DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
  }
  return (
    <DropdownMenuItem disabled={item.disabled} key={item.id} onClick={(e) => clickCall?.(item, e)}>
      {item.label}
      {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
    </DropdownMenuItem>
  );
};

export const Dropdown: FC<DropdownProps> = (props) => {
  const {
    items = [],
    onItemClick,
    onCheckedChange,
    align,
    asChild,
    hideOnEmpty = true,
    open,
    modal = false,
    side,
  } = props;
  if (!items?.length && hideOnEmpty) return null;
  return (
    <DropdownMenu modal={modal} onOpenChange={props.onOpenChange} open={open}>
      <DropdownMenuTrigger asChild={asChild}>{props.children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={cn(props.className)} side={side}>
        {items.filter((item) => !item.hidden).map((child) => renderItem(child, { onItemClick, onCheckedChange }))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
