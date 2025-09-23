import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog as UIAlertDialog,
} from '../../ui/alert-dialog'
import { Button } from '../button'
import { UIXContext } from '../config-provider'

import { type FC, type ReactNode, useContext, useMemo, useState } from 'react'
import get from 'lodash/get'
import { render as ReactDOMRender } from '@easykit/design/lib'

export interface ConfirmProps {
  title: ReactNode
  description: ReactNode
  cancelText?: string
  okText?: string
  // biome-ignore lint/suspicious/noConfusingVoidType: <onOk>
  onOk?: () => boolean | void | Promise<boolean | void>
  onCancel?: () => void
  open?: boolean
  confirmLoading?: boolean
}

const AlertDialog: FC<ConfirmProps> = (props) => {
  const { description, title, onOk, onCancel } = props

  const config = useContext(UIXContext)
  const okText = props.okText || get(config.locale, 'Alert.okText')
  const cancelText = props.cancelText || get(config.locale, 'Alert.cancelText')

  const [open, setOpen] = useState(props.open)
  const [loading, setLoading] = useState(false)

  return (
    <UIAlertDialog {...props} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => {
              setOpen(false)
              onCancel?.()
            }}
            variant="outline"
          >
            {cancelText}
          </Button>
          <Button
            loading={loading}
            onClick={async () => {
              setLoading(true)
              const result = onOk?.()
              let value: boolean | undefined
              if (result instanceof Promise) {
                value = (await result) as boolean | undefined
                if (typeof value === 'undefined') {
                  value = true
                }
              } else if (typeof result === 'undefined') {
                value = true
              } else {
                value = result
              }
              setLoading(false)
              if (value) {
                setOpen(false)
              }
            }}
          >
            {okText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </UIAlertDialog>
  )
}

export const useAlert = () => {
  return useMemo(() => {
    return {
      confirm: (props: ConfirmProps) => {
        // biome-ignore lint/suspicious/noExplicitAny: <root>
        let root: any
        const div = document.createElement('div')
        document.body.appendChild(div)
        const close = () => {
          setTimeout(() => {
            root = root?._unmount()
            if (div.parentNode) {
              div.parentNode.removeChild(div)
            }
          }, 200)
        }
        const onCancel = () => {
          close()
          props.onCancel?.()
        }
        root = ReactDOMRender(<AlertDialog {...props} onCancel={onCancel} open={true} />, div)
      },
    }
  }, [])
}
