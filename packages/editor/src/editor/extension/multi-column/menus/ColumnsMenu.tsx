import { useCallback } from "react";
import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import type { MenuProps } from "../../../menus/types";
import { Icon } from "../../../ui/Icon";
import { Toolbar } from "../../../ui/Toolbar";
import { getRenderContainer } from "../../../utils";
import { ColumnLayout } from "../Columns";

export const ColumnsMenu = ({ editor, appendTo }: MenuProps) => {
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "columns");
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isColumns = editor.isActive("columns");
    return isColumns;
  }, [editor]);

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      tippyOptions={{
        zIndex: 40,
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: "popper",
      }}
      updateDelay={0}
    >
      <Toolbar.Wrapper>
        <Toolbar.Button
          active={editor.isActive("columns", { layout: ColumnLayout.SidebarLeft })}
          onClick={onColumnLeft}
          tooltip="Sidebar left"
        >
          <Icon name="PanelLeft" />
        </Toolbar.Button>
        <Toolbar.Button
          active={editor.isActive("columns", { layout: ColumnLayout.TwoColumn })}
          onClick={onColumnTwo}
          tooltip="Two columns"
        >
          <Icon name="Columns2" />
        </Toolbar.Button>
        <Toolbar.Button
          active={editor.isActive("columns", { layout: ColumnLayout.SidebarRight })}
          onClick={onColumnRight}
          tooltip="Sidebar right"
        >
          <Icon name="PanelRight" />
        </Toolbar.Button>
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ColumnsMenu;
