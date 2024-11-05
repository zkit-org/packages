import TiptapTable from '@tiptap/extension-table'

export const Table = TiptapTable.configure({ allowTableNodeSelection: true, resizable: true, lastColumnResizable: false })

export default Table
