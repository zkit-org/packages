import {LinkEditorPanel} from '../../../panels'
import {Icon} from '../../../ui/Icon'
import {Toolbar} from '../../../ui/Toolbar'
import * as Popover from '@radix-ui/react-popover'
import {i18n} from "../../../utils/locale";

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void
}

export const EditLinkPopover = ({onSetLink}: EditLinkPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip={i18n("textMenu.editLink")}>
          <Icon name="Link"/>
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content>
        <LinkEditorPanel onSetLink={onSetLink}/>
      </Popover.Content>
    </Popover.Root>
  )
}
