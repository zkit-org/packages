import './container.css'
import "./editor.css";
import type { EditorEvents, Editor as EditorInstance } from '@tiptap/core'
import type { Extensions } from '@tiptap/core'
import {EditorContent} from '@tiptap/react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import {EditorController} from "./control";
import type { UploadImageFunction } from './extension/image-upload/ImageUpload'
import type { SlashCommandProps } from './extension/slash-command'
import { useEditor } from './hooks'

export type EditorProps = {
  limit?: number
  value?: string
  onChange?: (value: string) => void
  onCreate?: (props: EditorEvents['create']) => void
  extensions?: Extensions
  slashCommandProps?: SlashCommandProps
  uploadImage?: UploadImageFunction
}

export type EditorRef = {
  editor: EditorInstance | null;
}

export const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const { limit, value, onChange, onCreate, extensions, slashCommandProps, uploadImage } = props
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const [editor, data, handleId] = useEditor({
    limit,
    value,
    onChange,
    onCreate,
    extensions,
    slashCommandProps,
    uploadImage,
  })

  useImperativeHandle(
    ref,
    () => ({
      editor,
    }),
    [editor]
  )

  return (
    <div className="editor-container" ref={menuContainerRef}>
      <EditorContent className="editor" editor={editor} />
      <EditorController editor={editor} limit={limit} appendTo={menuContainerRef} handleId={handleId} data={data} />
    </div>
  )
});
