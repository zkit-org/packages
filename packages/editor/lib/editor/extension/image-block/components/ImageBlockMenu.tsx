import {BubbleMenu as BaseBubbleMenu, useEditorState} from '@tiptap/react'
import React, {ReactElement, useCallback, useRef} from 'react'
import {Instance, sticky} from 'tippy.js'
import {v4 as uuid} from 'uuid'

import {Toolbar} from '../../../ui/Toolbar'
import {Icon} from '../../../ui/Icon'
import {ImageBlockWidth} from './ImageBlockWidth'
import {MenuProps} from '../../../menus/types'
import {getRenderContainer} from '../../../utils'
import {i18n} from "../../../utils/locale";

export const ImageBlockMenu = ({editor, appendTo}: MenuProps): ReactElement => {
  const menuRef = useRef<HTMLDivElement>(null)
  const tippyInstance = useRef<Instance | null>(null)

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'node-imageBlock')
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

    return rect
  }, [editor])

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('imageBlock')

    return isActive
  }, [editor])

  const onAlignImageLeft = useCallback(() => {
    editor.chain().focus(undefined, {scrollIntoView: false}).setImageBlockAlign('left').run()
  }, [editor])

  const onAlignImageCenter = useCallback(() => {
    editor.chain().focus(undefined, {scrollIntoView: false}).setImageBlockAlign('center').run()
  }, [editor])

  const onAlignImageRight = useCallback(() => {
    editor.chain().focus(undefined, {scrollIntoView: false}).setImageBlockAlign('right').run()
  }, [editor])

  const onWidthChange = useCallback(
    (value: number) => {
      editor.chain().focus(undefined, {scrollIntoView: false}).setImageBlockWidth(value).run()
    },
    [editor],
  )
  const {isImageCenter, isImageLeft, isImageRight, width} = useEditorState({
    editor,
    selector: ctx => {
      return {
        isImageLeft: ctx.editor.isActive('imageBlock', {align: 'left'}),
        isImageCenter: ctx.editor.isActive('imageBlock', {align: 'center'}),
        isImageRight: ctx.editor.isActive('imageBlock', {align: 'right'}),
        width: parseInt(ctx.editor.getAttributes('imageBlock')?.width || 0),
      }
    },
  })

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        zIndex: 40,
        popperOptions: {
          modifiers: [{name: 'flip', enabled: false}],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance
        },
        appendTo: () => {
          return appendTo?.current
        },
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      <Toolbar.Wrapper shouldShowContent={shouldShow()} ref={menuRef}>
        <Toolbar.Button tooltip={i18n("imageBlock.align.left")} active={isImageLeft} onClick={onAlignImageLeft}>
          <Icon name="AlignHorizontalDistributeStart"/>
        </Toolbar.Button>
        <Toolbar.Button tooltip={i18n("imageBlock.align.center")} active={isImageCenter} onClick={onAlignImageCenter}>
          <Icon name="AlignHorizontalDistributeCenter"/>
        </Toolbar.Button>
        <Toolbar.Button tooltip={i18n("imageBlock.align.right")} active={isImageRight} onClick={onAlignImageRight}>
          <Icon name="AlignHorizontalDistributeEnd"/>
        </Toolbar.Button>
        <Toolbar.Divider/>
        <ImageBlockWidth onChange={onWidthChange} value={width}/>
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  )
}

export default ImageBlockMenu
