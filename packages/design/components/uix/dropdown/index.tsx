import {PropsWithChildren, FC, ReactNode, MouseEvent} from "react";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
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
} from "@/components/ui/dropdown-menu"
import {cn} from "@/lib/utils";

type Align = "start" | "center" | "end";

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
    asChild?: boolean;
    hideOnEmpty?: boolean;
    modal?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

type Callback = {
    onItemClick?: onDropdownMenuClick;
    onCheckedChange?: onCheckedChange;
}

const renderItem = (item: DropdownMenuItemProps, call: Callback) => {
    const clickCall = item.onItemClick || call.onItemClick;
    const checkedCall = item.onCheckedChange || call.onCheckedChange;
    if (item.type === "label") {
        return <DropdownMenuLabel key={item.id}>{ item.label }</DropdownMenuLabel>
    } else if (item.type === "separator") {
        return <DropdownMenuSeparator key={item.id} />
    } else if(item.type === "checkbox") {
        return <DropdownMenuCheckboxItem
            key={item.id}
            className="capitalize"
            checked={item.checked}
            onCheckedChange={(value) => checkedCall?.(item, value)}
        >
            {item.label}
        </DropdownMenuCheckboxItem>
    } else {
        if(item.children && item.children.length) {
            return <DropdownMenuSub key={item.id}>
                <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        { item.children.map((child) => renderItem(child, call)) }
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        }else {
            return <DropdownMenuItem onClick={(e) => clickCall?.(item, e)} key={item.id} disabled={item.disabled}>
                { item.label }
                { item.shortcut && <DropdownMenuShortcut>{ item.shortcut }</DropdownMenuShortcut> }
            </DropdownMenuItem>
        }
    }
}

export const Dropdown: FC<DropdownProps> = (props) => {
    const {
        items = [],
        onItemClick = () => {},
        onCheckedChange = () => {},
        align,
        asChild,
        hideOnEmpty = true,
        open,
        modal = false,
    } = props;
    if(!(items && items.length) && hideOnEmpty) return null;
    return <DropdownMenu
        modal={modal}
        open={open}
        onOpenChange={props.onOpenChange}
    >
        <DropdownMenuTrigger asChild={asChild}>
            { props.children }
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align={align}
            className={cn(
                props.className
            )}
        >
            { items.filter((item) => !item.hidden).map((child) => renderItem(child, {onItemClick, onCheckedChange})) }
        </DropdownMenuContent>
    </DropdownMenu>;
}
