import { type ChangeEvent, useCallback } from "react";
import cn from "classnames";

import { Button } from "../../../ui/Button";
import { Icon } from "../../../ui/Icon";
import { Spinner } from "../../../ui/Spinner";
import { i18n } from "../../../utils/locale";
import { type UseUploaderProps, useDropZone, useFileUpload, useUploader } from "./hooks";

export const ImageUploader = ({ onUpload, uploadImage }: UseUploaderProps) => {
  const { loading, uploadFile } = useUploader({ onUpload, uploadImage });
  const { handleUploadClick, ref } = useFileUpload();
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({ uploader: uploadFile });

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => (e.target.files ? uploadFile(e.target.files[0]) : null),
    [uploadFile],
  );

  if (loading) {
    return (
      <div className="flex min-h-[10rem] items-center justify-center rounded-lg bg-opacity-80 p-8">
        <Spinner className="text-neutral-500" size={1.5} />
      </div>
    );
  }

  const wrapperClass = cn(
    "flex flex-col items-center justify-center rounded-lg bg-opacity-80 px-8 py-10",
    draggedInside && "bg-neutral-100",
  );

  return (
    <div
      className={wrapperClass}
      contentEditable={false}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
      onDrop={onDrop}
    >
      <Icon className="mb-4 h-12 w-12 text-black opacity-20 dark:text-white" name="Image" />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center font-medium text-neutral-400 text-sm dark:text-neutral-500">
          {draggedInside ? i18n("imageUpload.draggedInside") : i18n("imageUpload.draggedInsideDefault")}
        </div>
        <div>
          <Button buttonSize="small" disabled={draggedInside} onClick={handleUploadClick} variant="primary">
            <Icon name="Upload" />
            {i18n("imageUpload.button")}
          </Button>
        </div>
      </div>
      <input
        accept=".jpg,.jpeg,.png,.webp,.gif"
        className="h-0 w-0 overflow-hidden opacity-0"
        onChange={onFileChange}
        ref={ref}
        type="file"
      />
    </div>
  );
};

export default ImageUploader;
