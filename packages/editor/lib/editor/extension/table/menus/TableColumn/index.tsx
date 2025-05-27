import {BubbleMenu as BaseBubbleMenu} from '@tiptap/react'
import React, { type ReactElement, useCallback } from 'react'
import { Item } from '../../../../ui/PopoverMenu'

import type { MenuProps, ShouldShowProps } from '../../../../menus/types'
import { Icon } from '../../../../ui/Icon'
import { Toolbar } from '../../../../ui/Toolbar'
import {i18n} from "../../../../utils/locale";
import { isColumnGripSelected } from './utils'

export const TableColumnMenu = React.memo(({editor, appendTo}: MenuProps): ReactElement => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state) {
        return false
      }

      return isColumnGripSelected({ editor, view, state, from: from || 0 })
    },
    [editor]
  )

  const onAddColumnBefore = useCallback(() => {
    editor.chain().focus().addColumnBefore().run()
  }, [editor])

  const onAddColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run()
  }, [editor])

  const onDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableColumnMenu"
      updateDelay={0}
      tippyOptions={{
        zIndex: 40,
        appendTo: () => {
          return appendTo?.current
        },
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <Toolbar.Wrapper isVertical>
        <Item
          iconComponent={<Icon name="ArrowLeftToLine" />}
          close={false}
          label={i18n('tableColumnMenu.onAddColumnBefore')}
          onClick={onAddColumnBefore}
        />
        <Item
          iconComponent={<Icon name="ArrowRightToLine" />}
          close={false}
          label={i18n('tableColumnMenu.onAddColumnAfter')}
          onClick={onAddColumnAfter}
        />
        <Item icon="Trash" close={false} label={i18n('tableColumnMenu.onDeleteColumn')} onClick={onDeleteColumn} />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  )
})

TableColumnMenu.displayName = 'TableColumnMenu'

export default TableColumnMenu
