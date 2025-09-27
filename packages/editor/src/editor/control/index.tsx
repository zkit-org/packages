import type { FC, RefObject } from "react";
import type { Editor } from "@tiptap/react";

import ImageBlockMenu from "../extension/image-block/components/ImageBlockMenu";
import ColumnsMenu from "../extension/multi-column/menus/ColumnsMenu";
import { TableColumnMenu, TableRowMenu } from "../extension/table/menus";
import LinkMenu from "../menus/LinkMenu/LinkMenu";
import { TextMenu } from "../menus/TextMenu";
import { CharacterCountControl } from "./character-count";
import { DragHandleControl } from "./drag-handle";
import type { NodeData } from "./drag-handle/use.data";

export type EditorControllerProps = {
  limit?: number;
  editor: Editor | null;
  handleId: string;
  appendTo: RefObject<HTMLElement | null>;
  data: NodeData;
};

export const EditorController: FC<EditorControllerProps> = (props) => {
  const { limit, data, editor, handleId, appendTo } = props;
  return editor ? (
    <>
      {limit ? <CharacterCountControl editor={editor} limit={limit} /> : null}
      <DragHandleControl data={data} editor={editor} id={handleId} />
      <LinkMenu appendTo={appendTo} editor={editor} />
      <TextMenu editor={editor} />
      <ColumnsMenu appendTo={appendTo} editor={editor} />
      <TableRowMenu appendTo={appendTo} editor={editor} />
      <TableColumnMenu appendTo={appendTo} editor={editor} />
      <ImageBlockMenu appendTo={appendTo} editor={editor} />
    </>
  ) : null;
};
