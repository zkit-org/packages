import {Spinner} from '../../../ui/Spinner'
import {useDropZone, useFileUpload, useUploader, UseUploaderProps} from './hooks'
import {Button} from '../../../ui/Button'
import {Icon} from '../../../ui/Icon'
import cn from "classnames";
import {ChangeEvent, useCallback} from 'react'
import {i18n} from "../../../utils/locale";

export const ImageUploader = ({onUpload, uploadImage}: UseUploaderProps) => {
  const {loading, uploadFile} = useUploader({onUpload, uploadImage})
  const {handleUploadClick, ref} = useFileUpload()
  const {draggedInside, onDrop, onDragEnter, onDragLeave} = useDropZone({uploader: uploadFile})

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => (e.target.files ? uploadFile(e.target.files[0]) : null),
    [uploadFile],
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
        <Spinner className="text-neutral-500" size={1.5}/>
      </div>
    )
  }

  const wrapperClass = cn(
    'flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80',
    draggedInside && 'bg-neutral-100',
  )

  return (
    <div
      className={wrapperClass}
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      contentEditable={false}
    >
      <Icon name="Image" className="w-12 h-12 mb-4 text-black dark:text-white opacity-20"/>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
          {draggedInside ? i18n("imageUpload.draggedInside") : i18n("imageUpload.draggedInsideDefault")}
        </div>
        <div>
          <Button disabled={draggedInside} onClick={handleUploadClick} variant="primary" buttonSize="small">
            <Icon name="Upload"/>
            {i18n("imageUpload.button")}
          </Button>
        </div>
      </div>
      <input
        className="w-0 h-0 overflow-hidden opacity-0"
        ref={ref}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.gif"
        onChange={onFileChange}
      />
    </div>
  )
}

export default ImageUploader
