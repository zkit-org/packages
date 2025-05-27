import {BubbleMenu as BaseBubbleMenu} from '@tiptap/react'
import { type ReactElement, useCallback, useState } from 'react'

import {LinkEditorPanel, LinkPreviewPanel} from '../../panels'
import type { MenuProps } from '../types'

export const LinkMenu = ({editor, appendTo}: MenuProps): ReactElement => {
  const [showEdit, setShowEdit] = useState(false) 

  const shouldShow = useCallback(() => {
    return editor.isActive('link')
  }, [editor])

  const {href: link, target} = editor.getAttributes('link')

  const handleEdit = useCallback(() => {
    setShowEdit(true)
  }, [])

  const onSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({href: url, target: openInNewTab ? '_blank' : ''})
        .run()
      setShowEdit(false)
    },
    [editor],
  )

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowEdit(false)
    return null
  }, [editor])

  // const onShowEdit = useCallback(() => {
  //   setShowEdit(true)
  // }, [])

  // const onHideEdit = useCallback(() => {
  //   setShowEdit(false)
  // }, [])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        zIndex: 40,
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        appendTo: () => {
          return appendTo?.current
        },
        onHidden: () => {
          setShowEdit(false)
        },
      }}
    >
      {showEdit ? (
        <LinkEditorPanel initialUrl={link} initialOpenInNewTab={target === '_blank'} onSetLink={onSetLink} />
      ) : (
        <LinkPreviewPanel url={link} onClear={onUnsetLink} onEdit={handleEdit} />
      )}
    </BaseBubbleMenu>
  )
}

export default LinkMenu
