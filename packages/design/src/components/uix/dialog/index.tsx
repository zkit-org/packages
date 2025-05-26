import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog as UIDialog,
} from '@easykit/design/components/ui/dialog'
import {Spin} from "@easykit/design/components/uix/spin";
import { cn } from '@easykit/design/lib'
import type { FC, PropsWithChildren } from 'react'
import type * as React from 'react'

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
    onCancel,
    maskClosable = true,
    className,
    closable = true,
    title,
    description,
    footer,
    loading = false,
  } = props

  return (
    <UIDialog open={visible}>
      <DialogContent
        autoFocus={false}
        showClose={closable}
        onCloseClick={onCancel}
        // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
        onOverlayClick={maskClosable ? onCancel : () => {}}
        onClick={(e) => e.stopPropagation()}
        className={cn(className)}
        aria-describedby={undefined}
      >
        {title || description ? (
          <DialogHeader>
            {title ? <DialogTitle>{title}</DialogTitle> : null}
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>
        ) : null}
        <div className="my-2">{props.children}</div>
        {footer ? <DialogFooter>{footer}</DialogFooter> : null}
        {loading ? (
          <div className={cn('absolute top-0 right-0 bottom-0 left-0 bg-white/50', 'flex items-center justify-center')}>
            <Spin />
          </div>
        ) : null}
      </DialogContent>
    </UIDialog>
  )
}
