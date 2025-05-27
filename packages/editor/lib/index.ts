import './style/tailwind.css'

// biome-ignore lint/performance/noReExportAll: <explanation>
export * from './editor/hooks'

export type { EditorProps, EditorRef } from "./editor";
export { Editor } from "./editor";

export type { ContentViewerProps } from "./editor/viewer";
export { ContentViewer } from "./editor/viewer";

export type { EditorEvents } from '@tiptap/core'
