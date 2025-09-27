import { useCallback, useEffect, useRef } from "react";
import type { EditorEvents, Editor as EditorInstance, Extensions, JSONContent } from "@tiptap/core";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { useEditor as useBaseEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";

import { type NodeData, useData } from "./control/drag-handle/use.data";
import { useHandleId } from "./control/drag-handle/use.handle.id";
import {
  BlockquoteFigure,
  CodeBlockLowlight,
  Color,
  Column,
  Columns,
  Document,
  Dropcursor,
  Figcaption,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  ImageBlock,
  ImageUpload,
  Link,
  Selection,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TaskItem,
  TaskList,
  TextAlign,
  TextStyle,
  Underline,
  UniqueId,
} from "./extension";
import GlobalDragHandle from "./extension/global-drag-handle";
import type { UploadImageFunction } from "./extension/image-upload/ImageUpload";
import SlashCommand, { type SlashCommandProps } from "./extension/slash-command";
import { i18n } from "./utils/locale";

export type UseEditorProps = {
  limit?: number;
  value?: string;
  onChange?: (value: string) => void;
  onReadOnlyChange?: (value: string) => void;
  editable?: boolean;
  onCreate?: (props: EditorEvents["create"]) => void;
  extensions?: Extensions;
  slashCommandProps?: SlashCommandProps;
  uploadImage?: UploadImageFunction;
};

// biome-ignore lint/suspicious/noExplicitAny: <updateAttrById>
const updateAttrById = (json: JSONContent, id: string, attr: string, value: any) => {
  if (!json.content) return;
  for (const node of json.content) {
    if (node.attrs?.id === id) {
      node.attrs[attr] = value;
    }
    if (node.content) {
      updateAttrById(node, id, attr, value);
    }
  }
};

const JSON_EXCLUDE = ["imageUpload"];

export const getJSONString = (editor: EditorInstance): string => {
  const json = editor.getJSON();
  // biome-ignore lint/suspicious/noExplicitAny: <node>
  json.content = json.content?.filter((node: any) => !JSON_EXCLUDE.includes(node.type));
  return JSON.stringify(json);
};

const UNIQUE_ATTRIBUTE_NAME = "id";

export const useEditor = (props: UseEditorProps): [EditorInstance, NodeData, string] => {
  const {
    onReadOnlyChange,
    value,
    onCreate,
    onChange,
    limit,
    editable = true,
    extensions = [],
    slashCommandProps,
    uploadImage,
  } = props;
  const handleId = useHandleId();
  const data = useData();

  const onReadOnlyChecked = useCallback(
    (node: ProseMirrorNode, checked: boolean) => {
      const jsonValue = editor?.getJSON();
      updateAttrById(jsonValue!, node.attrs.id, "checked", checked);
      editor?.commands.setContent(jsonValue!, false);
      onReadOnlyChange?.(JSON.stringify(jsonValue));
      return true;
    },
    [onReadOnlyChange],
  );

  const editor = useBaseEditor(
    {
      editable,
      extensions: [
        Document,
        Columns,
        TaskList,
        TaskItem.configure({
          nested: true,
          onReadOnlyChecked,
        }),
        Column,
        Selection,
        Heading.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        HorizontalRule,
        StarterKit.configure({
          document: false,
          dropcursor: false,
          heading: false,
          horizontalRule: false,
          blockquote: false,
          history: false,
          codeBlock: false,
        }),
        CharacterCount.configure({
          limit,
        }),
        GlobalDragHandle.configure({
          dragHandleSelector: `#${handleId}`,
          onNodeChange: data.handleNodeChange,
          onShow: () => data.setHidden(false),
          onHide: () => data.setHidden(true),
          uniqueId: UNIQUE_ATTRIBUTE_NAME,
        }),
        CodeBlockLowlight.configure({
          lowlight: createLowlight(common),
          defaultLanguage: null,
        }),
        TextStyle,
        FontSize,
        FontFamily,
        Color,
        // TrailingNode,
        Link.configure({
          openOnClick: false,
        }),
        Highlight.configure({ multicolor: true }),
        Underline,
        TextAlign.extend({
          addKeyboardShortcuts() {
            return {};
          },
        }).configure({
          types: ["heading", "paragraph"],
        }),
        Subscript,
        Superscript,
        Table,
        TableCell,
        TableHeader,
        TableRow,
        Typography,
        Placeholder.configure({
          includeChildren: true,
          showOnlyCurrent: false,
          placeholder: ({ node }) => {
            if (node.type.name === "blockquoteFigure") {
              return "";
            }
            if (node.type.name === "quoteCaption") {
              return i18n("placeholder.quoteCaption");
            }
            if (node.type.name === "quote") {
              return i18n("placeholder.quote");
            }
            return i18n("placeholder.default");
          },
        }),
        SlashCommand.configure(slashCommandProps),
        Focus,
        Figcaption,
        BlockquoteFigure,
        Dropcursor.configure({
          width: 2,
          class: "!bg-primary",
        }),
        ImageBlock,
        ImageUpload.configure({
          uploadImage,
        }),
        UniqueId.configure({
          attributeName: UNIQUE_ATTRIBUTE_NAME,
          types: [
            "paragraph",
            "heading",
            "blockquoteFigure",
            "codeBlock",
            "bulletList",
            "listItem",
            "orderedList",
            "taskList",
            "taskItem",
            "imageBlock",
            "table",
            "horizontalRule",
            "imageUpload",
          ],
          injectNodeName: false,
        }),
        History,
        ...extensions,
      ],
      immediatelyRender: false,
      content: value ? JSON.parse(value) : value,
      onUpdate: ({ editor }) => {
        if (editor.isInitialized) {
          onChange?.(getJSONString(editor));
        }
      },
      onCreate,
    },
    [onChange, onReadOnlyChecked, onCreate],
  );

  const isUpdate = useRef(false);

  // 监听 value 变化，必要时 setContent
  useEffect(() => {
    if (!(editor && value)) return;
    const current = JSON.stringify(editor.getJSON());
    if (current !== value && !isUpdate.current) {
      editor.commands.setContent(JSON.parse(value), false);
    }
  }, [value, editor]);

  // onUpdate 里判断是否是外部 setContent
  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      isUpdate.current = true;
      onChange?.(getJSONString(editor));
    };
    editor.on("update", handler);
    return () => {
      editor.off("update", handler);
    };
  }, [editor, onChange]);

  return [editor!, data, handleId];
};
