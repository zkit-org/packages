import {DropzoneOptions, useDropzone} from 'react-dropzone';
import {forwardRef, PropsWithChildren, useContext, useState} from "react";
import {cn} from "@easykit/design/lib";
import {UIXContext} from "@easykit/design/components/uix/config-provider";
import {v4 as uuidv4} from 'uuid';
import {CheckCircledIcon, Cross2Icon, CrossCircledIcon, FileIcon} from "@radix-ui/react-icons";
import {Button, Progress} from "@easykit/design";
import remove from 'lodash/remove';
import axios from "axios";
import classNames from "classnames";
import get from "lodash/get";

export type UploaderProps = PropsWithChildren<{
  showFileList?: boolean;
  className?: string;
  placeholder?: string;
  action?: string;
  uploadText?: string;
  maxLimit?: number;
  value?: (File & any)[];
  onChange?: (value: (File & any)[]) => void;
  headers?: any;
  data?: any;
  showButton?: boolean;
}> & DropzoneOptions;

const initFile = (file: File & any) => {
  file.uid ??= uuidv4();
  file.status ??= "done";
  return file;
}

// eslint-disable-next-line react/display-name
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
  } = props;

  const [files, setFiles] = useState<File[]>((value || []).map(initFile));

  const {getRootProps, getInputProps} = useDropzone({
    ...rest,
    onDropAccepted: (list: (File & any)[], event) => {
      onDropAccepted?.(list, event);
      const newFiles = [
        ...files,
        ...list.map((file) => {
          file.uid = uuidv4();
          file.status = "init";
          return file;
        }),
      ];
      setFiles(newFiles)
      onChange?.(newFiles);
    }
  });

  const config = useContext(UIXContext);
  const placeholder = props.placeholder || get(config.locale, "Uploader.placeholder");
  const uploadText = props.uploadText || get(config.locale, "Uploader.uploadText");

  const upload = async (file: File & any) => {
    const controller = new AbortController();
    file._controller = controller;
    const formData = new FormData();
    formData.append('file', file);
    const appendData = data || {};
    Object.keys(appendData).forEach((key) => {
      formData.append(key, appendData[key]);
    });
    axios.post(action!, formData, {
      headers,
      onUploadProgress: (progressEvent) => {
        file.progress = Math.ceil(progressEvent.progress! * 100);
        setFiles([...files]);
      },
      signal: controller.signal,
    }).then((response) => {
      file.status = "done";
      file.response = response;
      setFiles([...files]);
      onChange?.([...files]);
    }).catch((error) => {
      file.status = "error";
      file.error = error;
      setFiles([...files]);
      onChange?.([...files]);
    });
  }

  const onUpload = () => {
    files.forEach((file: File & any) => {
      if (file.status === "init") {
        file.status = "uploading";
        file.progress = 0;
        upload(file).then();
      }
    });
    setFiles([...files]);
    onChange?.([...files]);
  }

  const renderFile = (file: File & any) => {
    return <div key={file.uid} className={cn(
      "flex justify-center items-center border-b",
      "last:border-none"
    )}>
      <div className={"w-8 h-8 flex justify-center items-center"}><FileIcon/></div>
      <div className={"w-[50%] overflow-hidden whitespace-nowrap overflow-ellipsis"}>{file.name}</div>
      <div className={"flex-1 mx-1"}>
        {file.status === "uploading" && <Progress value={file.progress} className="w-full"/>}
        {file.status === "error" && <div className={"flex justify-end items-center text-red-500"}><CrossCircledIcon
          className={"mr-1"}/> {file.error.message}</div>}
        {file.status === "done" &&
          <div className={"flex justify-end items-center text-green-500"}><CheckCircledIcon/></div>}
      </div>
      <div
        className={cn(
          "w-8 h-8 flex justify-center items-center text-black/50",
          "hover:text-black/75 cursor-pointer hover:bg-[var(--action-hover)]"
        )}
        onClick={() => {
          remove(files, (item: File & any) => item.uid === file.uid);
          file._controller?.abort();
          setFiles([...files]);
          onChange?.([...files]);
        }}
      >
        <Cross2Icon/>
      </div>
    </div>
  }

  return <div ref={ref} className={"space-y-2 flex flex-col"}>
    <div {...getRootProps()} className={classNames(children ? "w-auto inline-block" : "", "outline-none")}>
      <input {...getInputProps()} />
      {
        children ? children : <div className={cn(
          "flex justify-center items-center p-6 text-[#bdbdbd]",
          "bg-[#fafafa] border-2 border-[#eeeeee] border-dashed rounded-md",
          "cursor-default",
          "focus:border-[#2196f3]",
          className
        )}>
          <p>{placeholder}</p>
        </div>
      }
    </div>
    {
      showFileList && files.length ? <>
        <div className={"border rounded-sm"}>
          {files.map(renderFile)}
        </div>
      </> : null
    }
    {
      (!!files.filter(({status}: any) => (status === 'init')).length) && showButton ? <div>
        <Button loading={!!files.filter(({status}: any) => (status === 'uploading')).length} onClick={onUpload}
          type={"button"} variant={"outline"}>{uploadText}</Button>
      </div> : null
    }
  </div>;
});
