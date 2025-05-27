import type { Editor } from '@tiptap/react'
import type { FC, RefObject } from 'react'
import ImageBlockMenu from '../extension/image-block/components/ImageBlockMenu'
import ColumnsMenu from '../extension/multi-column/menus/ColumnsMenu'
import { TableColumnMenu, TableRowMenu } from '../extension/table/menus'
import LinkMenu from '../menus/LinkMenu/LinkMenu'
import { TextMenu } from '../menus/TextMenu'
import { CharacterCountControl } from './character-count'
import { DragHandleControl } from './drag-handle'
import type { NodeData } from './drag-handle/use.data'

export type EditorControllerProps = {
  limit?: number
  editor: Editor | null
  handleId: string
  appendTo: RefObject<HTMLElement | null>
  data: NodeData
}

export const EditorController: FC<EditorControllerProps> = (props) => {
  const { limit, data, editor, handleId, appendTo } = props
  return editor ? (
    <>
      {limit ? <CharacterCountControl editor={editor} limit={limit} /> : null}
      <DragHandleControl data={data} editor={editor} id={handleId} />
      <LinkMenu editor={editor} appendTo={appendTo} />
      <TextMenu editor={editor} />
      <ColumnsMenu editor={editor} appendTo={appendTo} />
      <TableRowMenu editor={editor} appendTo={appendTo} />
      <TableColumnMenu editor={editor} appendTo={appendTo} />
      <ImageBlockMenu editor={editor} appendTo={appendTo} />
    </>
  ) : null
}
