import { useTranslation } from "react-i18next";

import type { DropdownMenuItemProps } from "@easykit/design";
import { useProfile } from "@/hooks";
import type { AppListResponse } from "@/types/app";

export const useAppItemMenus = (app: AppListResponse): DropdownMenuItemProps[] => {
  const { enable, role, ownerId } = app;
  const { t } = useTranslation();
  const profile = useProfile();
  const isOwner = profile?.id === ownerId;
  const isAdmin = role === 1;
  const isSystemApp = app.id === 1;
  return [
    {
      label: t("详情"),
      id: "detail",
      type: "item",
    },
    isAdmin &&
      !isSystemApp && {
        label: enable ? t("禁用") : t("启用"),
        id: enable ? "disable" : "enable",
        type: "item",
      },
    isOwner &&
      !isSystemApp && {
        label: t("删除"),
        id: "delete",
        type: "item",
      },
  ].filter(Boolean) as DropdownMenuItemProps[];
};
