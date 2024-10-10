import {PropsWithChildren, FC, Children, cloneElement, ReactElement} from "react";
import {cn} from "@/lib/utils";

export interface BreadcrumbsItemProps extends PropsWithChildren {
    last?: boolean;
}

export const BreadcrumbsItem: FC<BreadcrumbsItemProps> = (props) => {
    const {
        last = false
    } = props;
    return <div className={"text-muted-foreground"}>
        { props.children }
        { !last ?  <span className={"mx-2"}>/</span> : null }
    </div>
}

export interface BreadcrumbsProps extends PropsWithChildren {
    className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
    const {
        children,
        className
    } = props;

    const size = Children.count(children);

    return <div className={cn(
        "my-2 flex justify-start items-center", className
    )}>
        {
            Children.map(children, (child, index) => {
                const ele = child as ReactElement;
                if(!ele) return null;
                return cloneElement(ele, {...ele.props, last: index === size - 1})
            })
        }
    </div>
}
