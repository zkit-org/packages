import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

export type ActionProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>> & {
    theme?: 'dark' | 'light';
    active?: boolean;
    disabled?: boolean;
    elType?: 'button' | 'span';
};

export const Action = forwardRef<HTMLButtonElement, ActionProps>((props, ref) => {
    const {
        theme = 'dark',
        active = false,
        disabled = false,
        elType = "button",
        ...rest
    } = props;

    const elProps = {
        ...rest,
        ref,
        disabled,
        className: classNames(
            "p-2 flex justify-center items-center rounded-sm border border-transparent border-solid",
            theme === 'light' && "hover:bg-white/20",
            theme === 'light' && "focus:bg-white/30 focus:border-white/30",
            theme === 'light' && "active:bg-white/30 active:border-white/30",
            theme === 'dark' && "hover:bg-black/10",
            theme === 'dark' && "focus:bg-[#ececef] focus:border-[#bfbfc3] focus:shadow-[0_0_0_1px_#fff,0_0_0_3px_rgba(var(--primary))]",
            theme === 'dark' && "active:bg-[#ececef] active:border-[#bfbfc3] active:shadow-[0_0_0_1px_#fff,0_0_0_3px_rgba(var(--primary))]",
            (active && theme === 'light') && "bg-white/20",
            (active && theme === 'dark') && "bg-black/10",
            disabled && "opacity-50 cursor-not-allowed hover:bg-transparent focus:bg-transparent active:bg-transparent focus:shadow-none active:shadow-none focus:border-transparent active:border-transparent",
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
})
