import {Action} from "../../../components/action";
import {HamburgerMenuIcon, PlusIcon} from "@radix-ui/react-icons";
import {Editor} from '@tiptap/react'
import {FC, useEffect, useRef, useState} from "react";
import {NodeData} from "./use.data";
import {useContentActions} from "./use.content.actions";
import {Dropdown} from "@easykit/design";
import classNames from "classnames";
import {i18n} from "../../utils/locale";

export type DragHandleControlProps = {
  className?: string;
  editor: Editor;
  id: string;
  data: NodeData;
}

export const DragHandleControl: FC<DragHandleControlProps> = (props) => {
  const {editor, data} = props;
  const handleRef = useRef<HTMLDivElement>(null);
  const actions = useContentActions(editor!, data.currentNode!, data.currentPos!)
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [data.currentNode, data.hidden]);

  const actionClassName = "w-7 h-7 !p-0";
  return <div ref={handleRef} id={props.id} className={"absolute bg-black !left-0"} style={{top: -1000}}>
    <div className={"absolute right-0 pr-3 space-x-1 flex"}>
      <Action className={actionClassName} onClick={actions.handleAdd}>
        <PlusIcon/>
      </Action>
      <div className={"relative"}>
        <Action
          className={classNames(actionClassName, "relative z-1")}
          onClick={() => setMenuOpen(true)}
        >
          <HamburgerMenuIcon/>
        </Action>
        <Dropdown
          modal={false}
          open={menuOpen}
          onOpenChange={setMenuOpen}
          className={data.hidden ? "hidden" : ""}
          items={[
            {
              label: i18n("dragHandle.actions.clear"),
              type: "item",
              id: "clear-formatting",
            },
            {
              label: i18n("dragHandle.actions.duplicate"),
              type: "item",
              id: "duplicate",
            },
            {
              type: "separator",
              id: "separator"
            },
            {
              label: i18n("dragHandle.actions.delete"),
              type: "item",
              id: "delete",
            }
          ]}
          align={"start"}
          asChild={true}
          onItemClick={(item) => {
            if (item.id === 'clear-formatting') {
              actions.resetTextFormatting();
            } else if (item.id === 'duplicate') {
              actions.duplicateNode();
            } else if (item.id === 'delete') {
              actions.deleteNode();
            }
          }}
        >
          <Action className={classNames(actionClassName, "absolute invisible z-0 top-0 left-0")}>
            <HamburgerMenuIcon/>
          </Action>
        </Dropdown>
      </div>
    </div>
  </div>
}
