import Link from "next/link";
import { useTranslation } from "react-i18next";

import { DropdownMenuContent, DropdownMenuItem } from "@easykit/design";
export const Profile = () => {
  const { t } = useTranslation();

  return (
    <DropdownMenuContent align="start" className="w-48">
      <Link href={`/profile`}>
        <DropdownMenuItem>{t("个人资料")}</DropdownMenuItem>
      </Link>
      <Link href="/profile/security">
        <DropdownMenuItem>{t("安全设置")}</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  );
};
