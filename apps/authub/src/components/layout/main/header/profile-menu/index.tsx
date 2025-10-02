import { type FC, type ReactNode, useCallback, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import {
  Action,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useAlert,
  useMessage,
} from "@easykit/design";
import { logout } from "@/rest/auth";
import { AccountAvatar, AccountInfo } from "./account-info";

export type ProfileMenuProps = {
  extra?: ReactNode;
};

export const ProfileMenu: FC<ProfileMenuProps> = (props) => {
  const { extra } = props;
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const msg = useMessage();
  const { t } = useTranslation();

  const exit = useCallback(() => {
    alert.confirm({
      title: t("退出"),
      description: t("是否要退出当前账号？"),
      onOk: async () => {
        const { success, message } = await logout();
        if (success) {
          location.href = "/";
        } else {
          msg.error(message);
        }
        return success;
      },
    });
  }, [alert, msg, t]);

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Action active={open} className="!outline-none !rounded-full !p-0.5">
          <AccountAvatar className="h-7 w-7" />
        </Action>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-100 w-64 p-0">
        <AccountInfo />
        <DropdownMenuSeparator />
        <Link href={`/profile`} rel="noopener noreferrer" target="_blank">
          <DropdownMenuItem>{t("个人资料")}</DropdownMenuItem>
        </Link>
        {extra}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exit}>{t("退出")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
