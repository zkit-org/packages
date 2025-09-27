import { Icon } from "../../ui/Icon";
import { Surface } from "../../ui/Surface";
import { Toolbar } from "../../ui/Toolbar";
import Tooltip from "../../ui/Tooltip";
import { i18n } from "../../utils/locale";

export type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void;
  onClear: () => void;
};

export const LinkPreviewPanel = ({ onClear, onEdit, url }: LinkPreviewPanelProps) => {
  return (
    <Surface className="flex items-center gap-2 p-2">
      <a className="break-all text-sm underline" href={url} rel="noopener noreferrer" target="_blank">
        {url}
      </a>
      <Toolbar.Divider />
      <Tooltip title={i18n("panel.linkPreview.edit")}>
        <Toolbar.Button onClick={onEdit}>
          <Icon name="Pen" />
        </Toolbar.Button>
      </Tooltip>
      <Tooltip title={i18n("panel.linkPreview.delete")}>
        <Toolbar.Button onClick={onClear}>
          <Icon name="Trash2" />
        </Toolbar.Button>
      </Tooltip>
    </Surface>
  );
};
