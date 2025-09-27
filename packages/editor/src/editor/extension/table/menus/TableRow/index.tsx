import React, { type ReactElement, useCallback } from "react";
import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";

import type { MenuProps, ShouldShowProps } from "../../../../menus/types";
import { Icon } from "../../../../ui/Icon";
import { Item } from "../../../../ui/PopoverMenu";
import { Toolbar } from "../../../../ui/Toolbar";
import { i18n } from "../../../../utils/locale";
import { isRowGripSelected } from "./utils";

export const TableRowMenu = React.memo(({ editor, appendTo }: MenuProps): ReactElement => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!(state && from)) {
        return false;
      }

      return isRowGripSelected({ editor, view, state, from });
    },
    [editor],
  );

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run();
  }, [editor]);

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run();
  }, [editor]);

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run();
  }, [editor]);

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      shouldShow={shouldShow}
      tippyOptions={{
        zIndex: 40,
        appendTo: () => {
          return appendTo?.current;
        },
        placement: "left",
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
      }}
      updateDelay={0}
    >
      <Toolbar.Wrapper isVertical>
        <Item
          close={false}
          iconComponent={<Icon name="ArrowUpToLine" />}
          label={i18n("tableColumnMenu.onAddRowBefore")}
          onClick={onAddRowBefore}
        />
        <Item
          close={false}
          iconComponent={<Icon name="ArrowDownToLine" />}
          label={i18n("tableColumnMenu.onAddRowAfter")}
          onClick={onAddRowAfter}
        />
        <Item close={false} icon="Trash" label={i18n("tableColumnMenu.onDeleteRow")} onClick={onDeleteRow} />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
});

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu;
