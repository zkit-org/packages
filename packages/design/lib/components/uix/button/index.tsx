import { ButtonProps as UIButtonProps } from "@easykit/design/components/ui/button";
import { Button as UIButton } from "@easykit/design/components/ui/button";
import { cn } from '@easykit/design/lib';
import { Spin } from "@easykit/design/components/uix/spin";
import {forwardRef} from "react";

export interface ButtonProps extends UIButtonProps {
    loading?: boolean;
    long?: boolean;
    htmlType?: "submit" | "reset" | "button" | undefined;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        loading = false,
        long = false,
        disabled = false,
        className,
        ...rest
    } = props;

    return <UIButton
        {...rest}
        ref={ref}
        className={cn("space-x-1", className, long ? 'w-full' : null)}
        disabled={loading || disabled}
    >
        { loading ? <Spin /> : null }
        <span>{ props.children }</span>
    </UIButton>
});
