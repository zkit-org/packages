import {FC, HTMLAttributes, PropsWithChildren} from "react";
import classNames from "classnames";

export type ActionProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>> & {
    theme?: 'dark' | 'light';
    active?: boolean;
    disabled?: boolean;
    elType?: 'button' | 'span';
};

export const Action: FC<ActionProps> = (props) => {
    const {
        theme = 'dark',
        active = false,
        disabled = false,
        elType = "button",
        ...rest
    } = props;

    const elProps = {
        ...rest,
        disabled,
        className: classNames(
            "p-2 flex justify-center items-center rounded-sm border border-transparent border-solid",
            theme === 'light' && "hover:bg-white/20",
            theme === 'light' && "focus:bg-white/30 focus:border-white/30",
            theme === 'light' && "active:bg-white/30 active:border-white/30",
            theme === 'dark' && "action-effect action-effect-active",
            (active && theme === 'light') && "bg-white/20",
            (active && theme === 'dark') && "action-active",
            disabled && "action-effect-disabled",
            props.className
        )
    }

    return elType === "button" ? <button
        {...elProps}
        type={"button"}
    >
        { props.children }
    </button> : <span
        {...elProps}
    >
        {props.children}
    </span>
}
