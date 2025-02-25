import {BubbleMenu as BaseBubbleMenu} from '@tiptap/react'
import React, {ReactElement, useCallback} from 'react'
import * as PopoverMenu from '../../../../ui/PopoverMenu'

import {Toolbar} from '../../../../ui/Toolbar'
import {isRowGripSelected} from './utils'
import {Icon} from '../../../../ui/Icon'
import {MenuProps, ShouldShowProps} from '../../../../menus/types'
import {i18n} from "../../../../utils/locale";

export const TableRowMenu = React.memo(({editor, appendTo}: MenuProps): ReactElement => {
  const shouldShow = useCallback(
    ({view, state, from}: ShouldShowProps) => {
      if (!state || !from) {
        return false
      }

      return isRowGripSelected({editor, view, state, from})
    },
    [editor],
  )

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      updateDelay={0}
      tippyOptions={{
        zIndex: 40,
        appendTo: () => {
          return appendTo?.current
        },
        placement: 'left',
        offset: [0, 15],
        popperOptions: {
          modifiers: [{name: 'flip', enabled: false}],
        },
      }}
      shouldShow={shouldShow}
    >
      <Toolbar.Wrapper isVertical>
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowUpToLine"/>}
          close={false}
          label={i18n("tableColumnMenu.onAddRowBefore")}
          onClick={onAddRowBefore}
        />
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowDownToLine"/>}
          close={false}
          label={i18n("tableColumnMenu.onAddRowAfter")}
          onClick={onAddRowAfter}
        />
        <PopoverMenu.Item icon="Trash" close={false} label={i18n("tableColumnMenu.onDeleteRow")} onClick={onDeleteRow}/>
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  )
})

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
