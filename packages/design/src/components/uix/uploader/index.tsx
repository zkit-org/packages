import { Button, Progress } from '@easykit/design'
import { useMessage } from '@easykit/design'
import {UIXContext} from "@easykit/design/components/uix/config-provider";
import { cn } from '@easykit/design/lib'
import { CheckCircledIcon, Cross2Icon, CrossCircledIcon, FileIcon } from '@radix-ui/react-icons'
import classNames from "classnames";
import get from "lodash/get";
import remove from 'lodash/remove'
import { type PropsWithChildren, forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { type DropzoneOptions, useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import type { HandleProps, UploadFile } from './type'
import { defaultUploadHandle } from './utils'

export type UploaderProps = PropsWithChildren<{
  showFileList?: boolean
  className?: string
  placeholder?: string
  action?: string
  uploadText?: string
  value?: UploadFile[]
  onChange?: (value: UploadFile[]) => void
  headers?: Record<string, string>
  data?: unknown
  showButton?: boolean
  uploadHandle?: (props: HandleProps) => void
}> &
  DropzoneOptions

const initFile = (file: UploadFile) => {
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
    uploadHandle = defaultUploadHandle,
    maxFiles,
    ...rest
  } = props

  const [files, setFiles] = useState<UploadFile[]>((value || []).map(initFile))
  const filesRef = useRef<UploadFile[]>(files)
  const config = useContext(UIXContext)
  const message = useMessage()
  const placeholder = props.placeholder || get(config.locale, 'Uploader.placeholder')
  const uploadText = props.uploadText || get(config.locale, 'Uploader.uploadText')
  const maxFilesExceededText = get(config.locale, 'Uploader.maxFilesExceeded')
  const partialFilesAddedText =
    get(config.locale, 'Uploader.partialFilesAdded') || ', only %count more files can be added'

  // 检查是否达到文件上限
  const isMaxFilesReached = maxFiles !== undefined && files.length >= maxFiles

  useEffect(() => {
    if (value) {
      setFiles(value.map(initFile))
      filesRef.current = value.map(initFile)
    }
  }, [value])

  useEffect(() => {
    filesRef.current = files
  }, [files])

  const { getRootProps, getInputProps } = useDropzone({
    ...rest,
    maxFiles,
    disabled: isMaxFilesReached,
    onDropAccepted: (list: File[], event) => {
      onDropAccepted?.(list, event)

      // 检查 maxFiles 限制
      let filesToAdd = list
      if (maxFiles !== undefined) {
        const currentFileCount = filesRef.current.length
        const availableSlots = maxFiles - currentFileCount

        if (availableSlots <= 0) {
          // 已达到最大文件数，不添加任何文件
          message.warning(maxFilesExceededText)
          return
        }

        // 只添加可用槽位数量的文件
        if (list.length > availableSlots) {
          filesToAdd = list.slice(0, availableSlots)
          message.warning(
            `${maxFilesExceededText}${partialFilesAddedText.replace('%count', availableSlots.toString())}`
          )
        }
      }

      const newFiles = [
        ...filesRef.current,
        ...filesToAdd.map((file) => {
          const uploadFile = file as UploadFile
          uploadFile.uid = uuidv4()
          uploadFile.status = 'init'
          return uploadFile
        }),
      ]
      setFiles(newFiles)
      onChange?.(newFiles as UploadFile[])
    },
    onDropRejected(fileRejections) {
      // 收集所有文件名和错误信息
      const errorMessages = fileRejections.map((rejection) => {
        return `${rejection.file.name}: ${rejection.errors[0].message}`
      })
      message.warning(errorMessages.map((item) => <div key={item}>{item}</div>))
    },
  })

  const onUpload = useCallback(() => {
    const updateFile = (file: UploadFile, status: 'uploading' | 'done' | 'error') => {
      const idx = filesRef.current.findIndex((f) => (f as UploadFile).uid === file.uid)
      if (idx !== -1) {
        file.status = status
        filesRef.current[idx] = {
          ...filesRef.current[idx],
          ...file,
          name: filesRef.current[idx].name,
          size: filesRef.current[idx].size,
          type: filesRef.current[idx].type,
        }
        setFiles([...filesRef.current])
        onChange?.([...filesRef.current] as UploadFile[])
      }
    }
    for (const f of filesRef.current) {
      const file = f as UploadFile
      if (file.status === 'init') {
        file.status = 'uploading'
        file.progress = 0
        uploadHandle({
          file,
          action,
          headers,
          data,
          onProgress: (file) => updateFile(file, 'uploading'),
          onSuccess: (file) => updateFile(file, 'done'),
          onError: (file) => updateFile(file, 'error'),
        })
      }
    }
    setFiles([...filesRef.current])
    onChange?.([...filesRef.current] as UploadFile[])
  }, [action, headers, data, uploadHandle, onChange])

  const renderFile = (file: UploadFile) => {
    return (
      <div key={file.uid} className={cn('flex items-center justify-center border-b', 'last:border-none')}>
        <div className="flex h-8 w-8 items-center justify-center">
          <FileIcon />
        </div>
        <div className="w-[50%] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">{file.name}</div>
        <div className="mx-1 flex-1">
          {file.status === 'uploading' && <Progress value={file.progress} className="w-full" />}
          {file.status === 'error' && (
            <div className="flex items-center justify-end text-red-500">
              <CrossCircledIcon className="mr-1" />
              <span className="text-sm"> {file.error?.message}</span>
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
            remove(filesRef.current, (item: UploadFile) => item.uid === file.uid)
            file.controller?.abort()
            setFiles([...filesRef.current])
            onChange?.([...filesRef.current])
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
              isMaxFilesReached && 'cursor-not-allowed bg-gray-100 opacity-50',
              className
            )}
          >
            <p>{isMaxFilesReached ? maxFilesExceededText : placeholder}</p>
          </div>
        )}
      </div>
      {showFileList && files.length ? (
        <>
          <div className="rounded-sm border">{files.map(renderFile)}</div>
        </>
      ) : null}
      {!!files.filter(({ status }) => status === 'init').length && showButton ? (
        <div>
          <Button
            loading={!!files.filter(({ status }) => status === 'uploading').length}
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
