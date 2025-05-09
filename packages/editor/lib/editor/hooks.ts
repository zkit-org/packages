import {useEditor as useBaseEditor} from '@tiptap/react'
import {
  BlockquoteFigure,
  CodeBlockLowlight, Color,
  Column,
  Columns,
  Document, Dropcursor, Figcaption, Focus, FontFamily, FontSize,
  Heading, Highlight,
  HorizontalRule, ImageBlock, ImageUpload, Link,
  Selection, Subscript, Superscript, Table, TableCell, TableHeader, TableRow,
  TaskItem,
  TaskList, TextAlign, TextStyle, TrailingNode, Underline,
  UniqueId, History
} from "./extension";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import GlobalDragHandle from "./extension/global-drag-handle";
import {common, createLowlight} from "lowlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import SlashCommand, {SlashCommandProps} from './extension/slash-command';
import {useHandleId} from "./control/drag-handle/use.handle.id";
import {NodeData, useData} from "./control/drag-handle/use.data";
import {Editor as EditorInstance, JSONContent, EditorEvents, Extensions} from '@tiptap/core';
import {useCallback} from 'react';
import {Node as ProseMirrorNode} from '@tiptap/pm/model'
import {i18n} from "./utils/locale";

export type UseEditorProps = {
  limit?: number;
  value?: string;
  onChange?: (value: string) => void;
  onReadOnlyChange?: (value: string) => void;
  editable?: boolean;
  onCreate?: (props: EditorEvents['create']) => void;
  extensions?: Extensions;
  slashCommandProps?: SlashCommandProps;
}

const updateAttrById = (json: JSONContent, id: string, attr: string, value: any) => {
  json.content?.forEach((node: any) => {
    if (node.attrs?.id === id) {
      node.attrs[attr] = value;
    }
    if (node.content) {
      updateAttrById(node, id, attr, value);
    }
  });
}

const JSON_EXCLUDE = ["imageUpload"];

export const getJSONString = (editor: EditorInstance): string => {
  const json = editor.getJSON();
  json.content = json.content?.filter((node: any) => !JSON_EXCLUDE.includes(node.type));
  return JSON.stringify(json);
}

const UNIQUE_ATTRIBUTE_NAME = "id";

export const useEditor = (props: UseEditorProps): [EditorInstance, NodeData, string] => {
  const {
    onReadOnlyChange, value, onCreate, onChange,
    limit, editable = true,
    extensions = [], slashCommandProps,
  } = props;
  const handleId = useHandleId();
  const data = useData();

  const onReadOnlyChecked = useCallback((node: ProseMirrorNode, checked: boolean) => {
    const jsonValue = editor?.getJSON();
    updateAttrById(jsonValue!, node.attrs.id, "checked", checked);
    editor?.commands.setContent(jsonValue!, false);
    onReadOnlyChange?.(JSON.stringify(jsonValue));
    return true;
  }, [onReadOnlyChange]);

  const editor = useBaseEditor({
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
        uniqueId: UNIQUE_ATTRIBUTE_NAME
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
        defaultLanguage: null,
      }),
      TextStyle,
      FontSize,
      FontFamily,
      Color,
      TrailingNode,
      Link.configure({
        openOnClick: false,
      }),
      Highlight.configure({multicolor: true}),
      Underline,
      TextAlign.extend({
        addKeyboardShortcuts() {
          return {}
        },
      }).configure({
        types: ['heading', 'paragraph'],
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
        placeholder: ({node}) => {
          if (node.type.name === "blockquoteFigure") {
            return "";
          }
          if (node.type.name === 'quoteCaption') {
            return i18n("placeholder.quoteCaption");
          }
          if (node.type.name === 'quote') {
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
        class: '!bg-primary',
      }),
      ImageBlock,
      ImageUpload.configure({
        clientId: "test",
      }),
      UniqueId.configure({
        attributeName: UNIQUE_ATTRIBUTE_NAME,
        types: [
          'paragraph', 'heading', "blockquoteFigure", "codeBlock",
          "bulletList", "listItem", "orderedList", "taskList", "taskItem",
          "imageBlock", "table", "horizontalRule", "imageUpload",
        ],
        injectNodeName: false,
      }),
      History,
      ...extensions,
    ],
    immediatelyRender: false,
    content: value ? JSON.parse(value) : value,
    onUpdate: ({editor}) => {
      if (editor.isInitialized) {
        onChange?.(getJSONString(editor));
      }
    },
    onCreate,
  }, [onChange, onReadOnlyChecked, onCreate]);

  return [editor!, data, handleId];
}
