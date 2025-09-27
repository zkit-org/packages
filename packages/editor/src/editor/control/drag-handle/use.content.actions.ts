import { useCallback } from "react";
import type { ResolvedPos } from "@tiptap/pm/model";
import type { Editor } from "@tiptap/react";

export const useContentActions = (editor: Editor, resolvedPos: ResolvedPos, nodePos: number) => {
  const currentNode = resolvedPos?.node();
  const currentNodePos = resolvedPos?.depth === 0 ? resolvedPos?.pos : resolvedPos?.before();

  const resetTextFormatting = useCallback(() => {
    const chain = editor.chain();

    chain.setNodeSelection(currentNodePos).unsetAllMarks();

    if (currentNode?.type.name !== "paragraph") {
      chain.setParagraph();
    }

    chain.run();
  }, [editor, currentNodePos, currentNode?.type.name]);

  const duplicateNode = useCallback(() => {
    let currentPos = currentNodePos;
    if (["imageBlock", "imageUpload", "horizontalRule"].includes(currentNode?.type.name)) {
      currentPos = nodePos;
    }
    editor
      .chain()
      .setMeta("hideDragHandle", true)
      .insertContentAt(currentPos + (currentNode?.nodeSize || 0), currentNode.toJSON())
      .run();
  }, [editor, currentNodePos, currentNode, nodePos]);

  const deleteNode = useCallback(() => {
    let currentPos = currentNodePos;
    if (["imageBlock", "imageUpload", "horizontalRule"].includes(currentNode?.type.name)) {
      currentPos = nodePos;
    }
    editor.chain().setMeta("hideDragHandle", true).setNodeSelection(currentPos).deleteSelection().run();
  }, [editor, currentNodePos, nodePos, currentNode?.type.name]);

  const handleAdd = useCallback(() => {
    const nodePos = resolvedPos?.depth === 0 ? resolvedPos.pos + 1 : resolvedPos.after(1);
    const insertPos = nodePos;
    const currentNodeIsEmptyParagraph =
      resolvedPos?.depth === 1 && currentNode?.type.name === "paragraph" && currentNode?.content?.size === 0;
    const focusPos = currentNodeIsEmptyParagraph ? nodePos : nodePos + 2;

    editor
      .chain()
      .command(({ dispatch, tr, state }) => {
        if (dispatch) {
          if (currentNodeIsEmptyParagraph) {
            tr.insertText("/", resolvedPos.pos, resolvedPos.pos + 1);
          } else {
            tr.insert(insertPos, state.schema.nodes.paragraph.create(null, [state.schema.text("/")]));
          }
          return dispatch(tr);
        }
        return true;
      })
      .focus(focusPos)
      .run();
  }, [currentNode, editor, resolvedPos]);

  return {
    resetTextFormatting,
    duplicateNode,
    deleteNode,
    handleAdd,
  };
};
