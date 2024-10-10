import {
    Dialog as UIDialog,
    DialogDescription, DialogFooter,
    DialogHeader, DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { FC, PropsWithChildren } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Spin } from "@/components/uix/spin";

export type EventCallback = () => void;

export interface DialogProps extends PropsWithChildren {
    visible?: boolean;
    onCancel?: EventCallback;
    onOk?: EventCallback;
    className?: string;
    maskClosable?: boolean;
    closable?: boolean;
    title?: string;
    description?: string;
    footer?: React.ReactNode;
    loading?: boolean;
}

export const Dialog: FC<DialogProps> = (props) => {
    const {
        visible,
        onCancel =  () => {},
        onOk = () => {},
        maskClosable = true,
        className,
        closable = true,
        title,
        description,
        footer,
        loading = false,
    } = props;

    return <UIDialog open={visible}>
        <DialogContent
            autoFocus={false}
            showClose={closable}
            onCloseClick={onCancel}
            onOverlayClick={maskClosable ? onCancel : () => {}}
            className={cn(className)}
            aria-describedby={undefined}
        >
            {
                title || description ? <DialogHeader>
                    { title ? <DialogTitle>{title}</DialogTitle> : null }
                    { description ? <DialogDescription>{description}</DialogDescription> : null }
                </DialogHeader> : null
            }
            <div className={"my-2"}>
                { props.children }
            </div>
            {
                footer ? <DialogFooter>
                    { footer }
                </DialogFooter> : null
            }
            { loading ? <div className={cn(
                "absolute top-0 bottom-0 right-0 left-0 bg-white/50",
                "flex justify-center items-center"
            )}><Spin /></div> : null }
        </DialogContent>
    </UIDialog>
}
