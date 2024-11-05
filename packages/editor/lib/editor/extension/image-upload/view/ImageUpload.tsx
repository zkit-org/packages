import { Editor, NodeViewWrapper } from '@tiptap/react'
import { useCallback } from 'react'

import { ImageUploader } from './ImageUploader'

interface ImageUploadProps {
    editor: Editor
    getPos: () => number
    HTMLAttributes: Record<string, any>
}

export const ImageUpload = (props: ImageUploadProps) => {
    const { getPos, editor } = props;
    const onUpload = useCallback(
        (url: string) => {
            if (url) {
                editor.chain().setImageBlock({ src: url }).deleteRange({ from: getPos(), to: getPos() }).focus().run()
            }
        },
        [getPos, editor],
    )

    return (
        <NodeViewWrapper {...props.HTMLAttributes}>
            <div className="p-0 m-0" data-drag-handle>
                <ImageUploader onUpload={onUpload} />
            </div>
        </NodeViewWrapper>
    )
}

export default ImageUpload
