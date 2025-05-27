import '../container.css'
import '../editor.css'
import { EditorContent } from '@tiptap/react'
import type { FC } from 'react'
import { useEditor } from '../hooks'

export type ContentViewerProps = {
  value?: string
  onChange?: (value: string) => void
}

export const ContentViewer: FC<ContentViewerProps> = (props) => {
  const { value, onChange } = props
  const [editor] = useEditor({
    value,
    editable: false,
    onReadOnlyChange: onChange,
  })

  return (
    <div className="editor-container">
      <EditorContent className="editor" editor={editor} />
    </div>
  )
}
