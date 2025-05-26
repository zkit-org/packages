import {Editor} from '@tiptap/react'
import {useMemo} from 'react'
import {ContentPickerOptions} from '../components/ContentTypePicker'
import {i18n} from "../../../utils/locale";

export const useTextmenuContentTypes = (editor: Editor) => {
  const options = useMemo<ContentPickerOptions>(() => {
    return [
      {
        type: 'category',
        label: i18n("textMenu.hierarchy"),
        id: 'hierarchy',
      },
      {
        icon: 'Pilcrow',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setParagraph().run(),
        id: 'paragraph',
        disabled: () => !editor.can().setParagraph(),
        isActive: () =>
          editor.isActive('paragraph') &&
          !editor.isActive('orderedList') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('taskList'),
        label: i18n("textMenu.paragraph"),
        type: 'option',
      },
      {
        icon: 'Heading1',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setHeading({level: 1}).run(),
        id: 'heading1',
        disabled: () => !editor.can().setHeading({level: 1}),
        isActive: () => editor.isActive('heading', {level: 1}),
        label: i18n("textMenu.heading1"),
        type: 'option',
      },
      {
        icon: 'Heading2',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setHeading({level: 2}).run(),
        id: 'heading2',
        disabled: () => !editor.can().setHeading({level: 2}),
        isActive: () => editor.isActive('heading', {level: 2}),
        label: i18n("textMenu.heading2"),
        type: 'option',
      },
      {
        icon: 'Heading3',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setHeading({level: 3}).run(),
        id: 'heading3',
        disabled: () => !editor.can().setHeading({level: 3}),
        isActive: () => editor.isActive('heading', {level: 3}),
        label: i18n("textMenu.heading3"),
        type: 'option',
      },
      {
        type: 'category',
        label: i18n("textMenu.lists"),
        id: 'lists',
      },
      {
        icon: 'List',
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        id: 'bulletList',
        disabled: () => !editor.can().toggleBulletList(),
        isActive: () => editor.isActive('bulletList'),
        label: i18n("textMenu.bulletList"),
        type: 'option',
      },
      {
        icon: 'ListOrdered',
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        id: 'orderedList',
        disabled: () => !editor.can().toggleOrderedList(),
        isActive: () => editor.isActive('orderedList'),
        label: i18n("textMenu.orderedList"),
        type: 'option',
      },
      {
        icon: 'ListTodo',
        onClick: () => editor.chain().focus().toggleTaskList().run(),
        id: 'todoList',
        disabled: () => !editor.can().toggleTaskList(),
        isActive: () => editor.isActive('taskList'),
        label: i18n("textMenu.ListTodo"),
        type: 'option',
      },
    ]
  }, [editor, editor.state])

  return options
}
