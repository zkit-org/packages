import { Button, Progress } from '@easykit/design'
import {UIXContext} from "@easykit/design/components/uix/config-provider";
import { cn } from '@easykit/design/lib'
import { CheckCircledIcon, Cross2Icon, CrossCircledIcon, FileIcon } from '@radix-ui/react-icons'
import axios from "axios";
import classNames from "classnames";
import get from "lodash/get";
import remove from 'lodash/remove'
import { type PropsWithChildren, forwardRef, useContext, useState } from 'react'
import { type DropzoneOptions, useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'

export type UploaderProps = PropsWithChildren<{
  showFileList?: boolean
  className?: string
  placeholder?: string
  action?: string
  uploadText?: string
  maxLimit?: number
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  value?: (File & any)[]
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onChange?: (value: (File & any)[]) => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  headers?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any
  showButton?: boolean
}> &
  DropzoneOptions

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const initFile = (file: File & any) => {
  file.uid ??= uuidv4()
  file.status ??= 'done'
  return file
}

export const Uploader = forwardRef<HTMLDivElement, UploaderProps>((props, ref) => {
  const {
    className,
    onDropAccepted,
    action,
    onChange,
    value,
    headers,
    data,
    showButton = true,
    showFileList = true,
    children,
    ...rest
  } = props

  const [files, setFiles] = useState<File[]>((value || []).map(initFile));

  const { getRootProps, getInputProps } = useDropzone({
    ...rest,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onDropAccepted: (list: (File & any)[], event) => {
      onDropAccepted?.(list, event)
      const newFiles = [
        ...files,
        ...list.map((file) => {
          file.uid = uuidv4()
          file.status = 'init'
          return file
        }),
      ]
      setFiles(newFiles)
      onChange?.(newFiles)
    },
  })

  const config = useContext(UIXContext);
  const placeholder = props.placeholder || get(config.locale, "Uploader.placeholder");
  const uploadText = props.uploadText || get(config.locale, "Uploader.uploadText");

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const upload = async (file: File & any) => {
    const controller = new AbortController()
    file._controller = controller
    const formData = new FormData()
    formData.append('file', file)
    const appendData = data || {}
    for (const key of Object.keys(appendData)) {
      formData.append(key, appendData[key])
    }
    axios
      .post(action!, formData, {
        headers,
        onUploadProgress: (progressEvent) => {
          file.progress = Math.ceil(progressEvent.progress! * 100)
          setFiles([...files])
        },
        signal: controller.signal,
      })
      .then((response) => {
        file.status = 'done'
        file.response = response
        setFiles([...files])
        onChange?.([...files])
      })
      .catch((error) => {
        file.status = 'error'
        file.error = error
        setFiles([...files])
        onChange?.([...files])
      })
  }

  const onUpload = () => {
    for (const f of files) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const file = f as any
      if (file.status === 'init') {
        file.status = 'uploading'
        file.progress = 0
        upload(file).then()
      }
    }
    setFiles([...files])
    onChange?.([...files])
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const renderFile = (file: File & any) => {
    return (
      <div key={file.uid} className={cn('flex items-center justify-center border-b', 'last:border-none')}>
        <div className="flex h-8 w-8 items-center justify-center">
          <FileIcon />
        </div>
        <div className="w-[50%] overflow-hidden overflow-ellipsis whitespace-nowrap">{file.name}</div>
        <div className="mx-1 flex-1">
          {file.status === 'uploading' && <Progress value={file.progress} className="w-full" />}
          {file.status === 'error' && (
            <div className="flex items-center justify-end text-red-500">
              <CrossCircledIcon className="mr-1" /> {file.error.message}
            </div>
          )}
          {file.status === 'done' && (
            <div className="flex items-center justify-end text-green-500">
              <CheckCircledIcon />
            </div>
          )}
        </div>
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center text-black/50',
            'cursor-pointer hover:bg-[var(--action-hover)] hover:text-black/75'
          )}
          onClick={() => {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            remove(files, (item: File & any) => item.uid === file.uid)
            file._controller?.abort()
            setFiles([...files])
            onChange?.([...files])
          }}
        >
          <Cross2Icon />
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="flex flex-col space-y-2">
      <div {...getRootProps()} className={classNames(children ? 'inline-block w-auto' : '', 'outline-none')}>
        <input {...getInputProps()} />
        {children ? (
          children
        ) : (
          <div
            className={cn(
              'flex items-center justify-center p-6 text-[#bdbdbd]',
              'rounded-md border-2 border-[#eeeeee] border-dashed bg-[#fafafa]',
              'cursor-default',
              'focus:border-[#2196f3]',
              className
            )}
          >
            <p>{placeholder}</p>
          </div>
        )}
      </div>
      {showFileList && files.length ? (
        <>
          <div className="rounded-sm border">{files.map(renderFile)}</div>
        </>
      ) : null}
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      {!!files.filter(({ status }: any) => status === 'init').length && showButton ? (
        <div>
          <Button
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            loading={!!files.filter(({ status }: any) => status === 'uploading').length}
            onClick={onUpload}
            type="button"
            variant="outline"
          >
            {uploadText}
          </Button>
        </div>
      ) : null}
    </div>
  )
});
