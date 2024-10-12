import {
    AlertDialog as UIAlertDialog,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@easykit/design/components/ui/alert-dialog";
import {FC, useContext, useState} from "react";
import { render as ReactDOMRender } from '@easykit/design/lib';
import {Button} from "@easykit/design/components/uix/button";
import {UIXContext} from "@easykit/design/components/uix/config-provider";

export interface ConfirmProps {
    title?: string;
    description?: string;
    cancelText?: string;
    okText?: string;
    onOk?: () => boolean | void | Promise<boolean|void> ;
    onCancel?: () => void;
    open?: boolean;
    confirmLoading?: boolean;
}

const AlertDialog: FC<ConfirmProps> = (props) => {
    const {
        description,
        title,
        onOk = () => {},
        onCancel = () => {},
    } = props;

    const config = useContext(UIXContext);
    const okText = props.okText || config.locale.Alert.okText;
    const cancelText = props.cancelText || config.locale.Alert.cancelText;

    const [open, setOpen] = useState(props.open);
    const [loading, setLoading] = useState(false);

    return <UIAlertDialog {...props} open={open}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <Button
                    variant={"outline"}
                    onClick={() => {
                        setOpen(false);
                        onCancel();
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    loading={loading}
                    onClick={async () => {
                        setLoading(true);
                        const result = onOk();
                        let value: boolean|void;
                        if(result instanceof Promise) {
                            value = (await result);
                            if(typeof value === 'undefined') {
                                value = true;
                            }
                        }else if(typeof result === 'undefined') {
                            value = true;
                        }else{
                            value = result;
                        }
                        setLoading(false);
                        if(value) {
                            setOpen(false);
                        }
                    }}
                >
                    {okText}
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </UIAlertDialog>
}

export const useAlert = () => {
    return {
        confirm: (props: ConfirmProps) => {
            let root: any;
            const div = document.createElement('div');
            document.body.appendChild(div);
            const close = () => {
                setTimeout(() => {
                    root = root?._unmount();
                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                }, 200);
            }
            const onCancel = () => {
                close();
                props.onCancel?.();
            }
            root = ReactDOMRender(<AlertDialog {...props} open={true} onCancel={onCancel} />, div);
        }
    }
}
