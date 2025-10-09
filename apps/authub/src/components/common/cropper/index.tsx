import { useState } from "react";
import classNames from "classnames";
import { FilePenLine, X } from "lucide-react";

import { Spin, Uploader, type UploadFile, useMessage } from "@easykit/design";
import { dataURLToFile, fileToDataURL, upload } from "@/utils/file";
import { CropperDialog } from "./dialog";

export type CropperProps = {
  value?: string;
  onChange?: (value?: string) => void;
  className?: string;
};

export const Cropper = (props: CropperProps) => {
  const { value, onChange, className } = props;
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [visible, setVisible] = useState(false);
  const [fileSrc, setFileSrc] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const [src, setSrc] = useState<string | undefined>(value);

  const msg = useMessage();

  const onDropAccepted = (files: File[]) => {
    fileToDataURL(files[0]).then((src) => {
      setFileSrc(src as string);
      setVisible(true);
    });
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    const { success, data, error } = await upload({
      file,
      name: file.name,
      contentType: file.type,
      type: 0,
    });
    setUploading(false);
    if (success) {
      setSrc(data!);
      onChange?.(data!);
    } else {
      msg.error(error);
    }
  };

  const onCrop = (dataURL: string) => {
    const file = dataURLToFile(dataURL!, "cropped.png");
    setVisible(false);
    uploadFile(file).then();
  };

  const onRemove = () => {
    setSrc(undefined);
    onChange?.(undefined);
    setFiles([]);
  };

  const iconClassName = "flex size-8 items-center justify-center rounded-sm bg-black/30 text-white hover:bg-black/50";

  return (
    <div className={classNames("group relative h-32 w-32 overflow-hidden rounded-lg border bg-secondary", className)}>
      {src ? <img alt="logo" src={src} /> : null}
      <div
        className={classNames(
          "absolute top-0 right-0 bottom-0 left-0 items-center justify-center gap-xs",
          "hidden group-hover:flex",
          (uploading || !src) && "!flex",
        )}
      >
        {src ? (
          <div className={iconClassName} onClick={onRemove}>
            <X className="size-4" />
          </div>
        ) : (
          <Uploader
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
            }}
            maxFiles={1}
            onChange={setFiles}
            onDropAccepted={onDropAccepted}
            showButton={false}
            showFileList={false}
            value={files}
          >
            <div className={iconClassName}>{uploading ? <Spin /> : <FilePenLine className="size-4" />}</div>
          </Uploader>
        )}
      </div>
      <CropperDialog onCancel={() => setVisible(false)} onCrop={onCrop} src={fileSrc} visible={visible} />
    </div>
  );
};
