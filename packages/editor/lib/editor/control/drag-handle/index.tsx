import { Dropdown } from '@easykit/design'
import {HamburgerMenuIcon, PlusIcon} from "@radix-ui/react-icons";
import type { Editor } from '@tiptap/react'
import classNames from "classnames";
import { type FC, useEffect, useRef, useState } from 'react'
import { Action } from '../../../components/action'
import {i18n} from "../../utils/locale";
import { useContentActions } from './use.content.actions'
import type { NodeData } from './use.data'

export type DragHandleControlProps = {
  className?: string;
  editor: Editor;
  id: string;
  data: NodeData;
}

export const DragHandleControl: FC<DragHandleControlProps> = (props) => {
  const { editor, data } = props
  const handleRef = useRef<HTMLDivElement>(null)
  const actions = useContentActions(editor!, data.currentNode!, data.currentPos!)
  const [menuOpen, setMenuOpen] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setMenuOpen(false)
  }, [data.currentNode, data.hidden])

  const actionClassName = 'w-7 h-7 !p-0'
  return (
    <div ref={handleRef} id={props.id} className="!left-0 absolute bg-black" style={{ top: -1000 }}>
      <div className="absolute right-0 flex space-x-1 pr-3">
        <Action className={actionClassName} onClick={actions.handleAdd}>
          <PlusIcon />
        </Action>
        <div className="relative">
          <Action className={classNames(actionClassName, 'relative z-1')} onClick={() => setMenuOpen(true)}>
            <HamburgerMenuIcon />
          </Action>
          <Dropdown
            modal={false}
            open={menuOpen}
            onOpenChange={setMenuOpen}
            className={data.hidden ? 'hidden' : ''}
            items={[
              {
                label: i18n('dragHandle.actions.clear'),
                type: 'item',
                id: 'clear-formatting',
              },
              {
                label: i18n('dragHandle.actions.duplicate'),
                type: 'item',
                id: 'duplicate',
              },
              {
                type: 'separator',
                id: 'separator',
              },
              {
                label: i18n('dragHandle.actions.delete'),
                type: 'item',
                id: 'delete',
              },
            ]}
            align="start"
            asChild={true}
            onItemClick={(item) => {
              if (item.id === 'clear-formatting') {
                actions.resetTextFormatting()
              } else if (item.id === 'duplicate') {
                actions.duplicateNode()
              } else if (item.id === 'delete') {
                actions.deleteNode()
              }
            }}
          >
            <Action className={classNames(actionClassName, 'invisible absolute top-0 left-0 z-0')}>
              <HamburgerMenuIcon />
            </Action>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
