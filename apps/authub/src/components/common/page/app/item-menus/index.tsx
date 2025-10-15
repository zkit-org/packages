import type { FC } from "react";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Action, Dropdown, useAlert } from "@easykit/design";
import { useMutation } from "@/hooks";
import { deleteApp, disable, enable } from "@/rest/app";
import type { AppListResponse } from "@/types/app";
import { useAppsReload } from "../hooks";
import { useAppItemMenus } from "./config";

export type AppItemMenusProps = {
  app: AppListResponse;
};

export const AppItemMenus: FC<AppItemMenusProps> = (props) => {
  const { app } = props;
  const items = useAppItemMenus(app);
  const alert = useAlert();
  const { t } = useTranslation();
  const reload = useAppsReload();
  const router = useRouter();

  const { mutateAsync: enableMutate } = useMutation({
    mutationFn: enable,
    onSuccess: () => {
      reload();
    },
  });

  const { mutateAsync: disableMutate } = useMutation({
    mutationFn: disable,
    onSuccess: () => {
      reload();
    },
  });

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: deleteApp,
    onSuccess: () => {
      reload();
    },
  });

  return (
    <Dropdown
      align="end"
      asChild
      items={items}
      onItemClick={(item) => {
        if (item.id === "enable") {
          alert.confirm({
            title: t("启用"),
            description: t("是否启用该应用？"),
            onOk: () => enableMutate(app.id),
          });
        } else if (item.id === "disable") {
          alert.confirm({
            title: t("禁用"),
            description: t("是否禁用该应用？"),
            onOk: () => disableMutate(app.id),
          });
        } else if (item.id === "delete") {
          alert.confirm({
            title: t("删除"),
            description: t("是否删除该应用？"),
            onOk: () => deleteMutate(app.id),
          });
        } else if (item.id === "detail") {
          router.push(`/apps/${app.id}/detail`);
        }
      }}
    >
      <Action>
        <EllipsisVertical className="size-4" />
      </Action>
    </Dropdown>
  );
};
