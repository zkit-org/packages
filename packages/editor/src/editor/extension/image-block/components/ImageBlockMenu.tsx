import { type ReactElement, useCallback, useRef } from "react";
import { BubbleMenu as BaseBubbleMenu, useEditorState } from "@tiptap/react";
import { type Instance, sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import type { MenuProps } from "../../../menus/types";
import { Icon } from "../../../ui/Icon";
import { Toolbar } from "../../../ui/Toolbar";
import { getRenderContainer } from "../../../utils";
import { i18n } from "../../../utils/locale";
import { ImageBlockWidth } from "./ImageBlockWidth";

export const ImageBlockMenu = ({ editor, appendTo }: MenuProps): ReactElement => {
  const menuRef = useRef<HTMLDivElement>(null);
  const tippyInstance = useRef<Instance | null>(null);

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "node-imageBlock");
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("imageBlock");

    return isActive;
  }, [editor]);

  const onAlignImageLeft = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign("left").run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign("center").run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign("right").run();
  }, [editor]);

  const onWidthChange = useCallback(
    (value: number) => {
      editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(value).run();
    },
    [editor],
  );
  const { isImageCenter, isImageLeft, isImageRight, width } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isImageLeft: ctx.editor.isActive("imageBlock", { align: "left" }),
        isImageCenter: ctx.editor.isActive("imageBlock", { align: "center" }),
        isImageRight: ctx.editor.isActive("imageBlock", { align: "right" }),
        width: Number.parseInt(ctx.editor.getAttributes("imageBlock")?.width || 0, 10),
      };
    },
  });

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${uuid()}`}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        zIndex: 40,
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance;
        },
        appendTo: () => {
          return appendTo?.current;
        },
        plugins: [sticky],
        sticky: "popper",
      }}
      updateDelay={0}
    >
      <Toolbar.Wrapper ref={menuRef} shouldShowContent={shouldShow()}>
        <Toolbar.Button active={isImageLeft} onClick={onAlignImageLeft} tooltip={i18n("imageBlock.align.left")}>
          <Icon name="AlignHorizontalDistributeStart" />
        </Toolbar.Button>
        <Toolbar.Button active={isImageCenter} onClick={onAlignImageCenter} tooltip={i18n("imageBlock.align.center")}>
          <Icon name="AlignHorizontalDistributeCenter" />
        </Toolbar.Button>
        <Toolbar.Button active={isImageRight} onClick={onAlignImageRight} tooltip={i18n("imageBlock.align.right")}>
          <Icon name="AlignHorizontalDistributeEnd" />
        </Toolbar.Button>
        <Toolbar.Divider />
        <ImageBlockWidth onChange={onWidthChange} value={width} />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ImageBlockMenu;
