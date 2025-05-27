import { Content as PopoverContent, Root as PopoverRoot, Trigger as PopoverTrigger } from '@radix-ui/react-popover'
import {LinkEditorPanel} from '../../../panels'
import {Icon} from '../../../ui/Icon'
import { Toolbar } from '../../../ui/Toolbar'
import {i18n} from "../../../utils/locale";

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void
}

export const EditLinkPopover = ({onSetLink}: EditLinkPopoverProps) => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Toolbar.Button tooltip={i18n('textMenu.editLink')}>
          <Icon name="Link" />
        </Toolbar.Button>
      </PopoverTrigger>
      <PopoverContent>
        <LinkEditorPanel onSetLink={onSetLink} />
      </PopoverContent>
    </PopoverRoot>
  )
}
