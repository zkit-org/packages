import {FC, HTMLAttributes} from "react";
import {cn} from "@easykit/design/lib";

export interface ActionProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    disabled?: boolean;
}

export const Action: FC<ActionProps> = (props) => {
    const {
        disabled = false,
        onClick
    } = props;
    return <div
        className={cn(
            "h-9 rounded-sm flex justify-center items-center cursor-pointer px-2",
            "hover:bg-[var(--action-hover)]",
            disabled && "opacity-30",
            props.className,
        )}
        onClick={(e) => {
            if(disabled) return;
            onClick && onClick(e);
        }}
    >
        { props.children }
    </div>
}
