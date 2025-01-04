import { Group } from './types'
import {i18n} from "../../utils/locale";

export const getGroups = (): Group[] => [
    {
        name: 'format',
        title: i18n("slashCommand.group.format"),
        commands: [
            {
                name: 'heading1',
                label: i18n("slashCommand.heading1.title"),
                iconName: 'Heading1',
                description: i18n("slashCommand.heading1.description"),
                aliases: ['h1'],
                action: editor => {
                    editor.chain().focus().setHeading({ level: 1 }).run()
                },
            },
            {
                name: 'heading2',
                label: i18n("slashCommand.heading2.title"),
                iconName: 'Heading2',
                description: i18n("slashCommand.heading2.description"),
                aliases: ['h2'],
                action: editor => {
                    editor.chain().focus().setHeading({ level: 2 }).run()
                },
            },
            {
                name: 'heading3',
                label: i18n("slashCommand.heading3.title"),
                iconName: 'Heading3',
                description: i18n("slashCommand.heading3.description"),
                aliases: ['h3'],
                action: editor => {
                    editor.chain().focus().setHeading({ level: 3 }).run()
                },
            },
            {
                name: 'bulletList',
                label: i18n("slashCommand.bulletList.title"),
                iconName: 'List',
                description: i18n("slashCommand.bulletList.description"),
                aliases: ['ul'],
                action: editor => {
                    editor.chain().focus().toggleBulletList().run()
                },
            },
            {
                name: 'numberedList',
                label: i18n("slashCommand.numberedList.title"),
                iconName: 'ListOrdered',
                description: i18n("slashCommand.numberedList.description"),
                aliases: ['ol'],
                action: editor => {
                    editor.chain().focus().toggleOrderedList().run()
                },
            },
            {
                name: 'taskList',
                label: i18n("slashCommand.taskList.title"),
                iconName: 'ListTodo',
                description: i18n("slashCommand.taskList.description"),
                aliases: ['todo'],
                action: editor => {
                    editor.chain().focus().toggleTaskList().run()
                },
            },
            {
                name: 'blockquote',
                label: i18n("slashCommand.blockquote.title"),
                iconName: 'Quote',
                description: i18n("slashCommand.blockquote.description"),
                action: editor => {
                    editor.chain().focus().setBlockquote().run()
                },
            },
            {
                name: 'codeBlock',
                label: i18n("slashCommand.codeBlock.title"),
                iconName: 'SquareCode',
                description: i18n("slashCommand.codeBlock.description"),
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => {
                    editor.chain().focus().setCodeBlock().run()
                },
            },
        ],
    },
    {
        name: 'insert',
        title: i18n("slashCommand.group.insert"),
        commands: [
            {
                name: 'table',
                label: i18n("slashCommand.table.title"),
                iconName: 'Table',
                description: i18n("slashCommand.table.description"),
                shouldBeHidden: editor => editor.isActive('columns'),
                action: editor => {
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
                },
            },
            {
                name: 'image',
                label: i18n("slashCommand.image.title"),
                iconName: 'Image',
                description: i18n("slashCommand.image.description"),
                aliases: ['img'],
                action: editor => {
                    editor.chain().focus().setImageUpload().run()
                },
            },
            // {
            //     name: 'columns',
            //     label: t("列"),
            //     iconName: 'Columns2',
            //     description: t("添加两列内容"),
            //     aliases: ['cols'],
            //     shouldBeHidden: editor => editor.isActive('columns'),
            //     action: editor => {
            //         editor
            //             .chain()
            //             .focus()
            //             //.setColumns()
            //             .focus(editor.state.selection.head - 1)
            //             .run()
            //     },
            // },
            {
                name: 'horizontalRule',
                label: i18n("slashCommand.horizontalRule.title"),
                iconName: 'Minus',
                description: i18n("slashCommand.horizontalRule.description"),
                aliases: ['hr'],
                action: editor => {
                    editor.chain().focus().setHorizontalRule().run()
                },
            },
            // {
            //     name: 'toc',
            //     label: t("表格内容"),
            //     iconName: 'Book',
            //     aliases: ['outline'],
            //     description: t("插入表格内容"),
            //     shouldBeHidden: editor => editor.isActive('columns'),
            //     action: editor => {
            //         editor.chain().focus()//.insertTableOfContents().run()
            //     },
            // },
        ],
    },
]
