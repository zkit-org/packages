import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { type ComponentType, useCallback } from 'react'

import { ImageUploader } from './ImageUploader'

export const ImageUpload: ComponentType<NodeViewProps> = (props) => {
  const { getPos, editor, extension } = props
  const { uploadImage } = extension?.options || {}
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        editor.chain().setImageBlock({ src: url }).deleteRange({ from: getPos(), to: getPos() }).focus().run()
      }
    },
    [getPos, editor]
  )

  return (
    <NodeViewWrapper {...props.HTMLAttributes}>
      <div className="m-0 p-0" data-drag-handle>
        <ImageUploader onUpload={onUpload} uploadImage={uploadImage} />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageUpload
