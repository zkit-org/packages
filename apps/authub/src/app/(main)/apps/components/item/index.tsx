import type { FC } from "react";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Action, Avatar, Badge, Dropdown, type DropdownMenuItemProps, useAlert } from "@easykit/design";
import { useMutation, useProfile } from "@/hooks";
import { deleteApp, disable, enable } from "@/rest/app";
import type { AppListResponse } from "@/types/app";
import { useAppsReload } from "../hooks";

export type AppItemProps = {
  app: AppListResponse;
};

const useItems = (app: AppListResponse): DropdownMenuItemProps[] => {
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

export const AppItem: FC<AppItemProps> = (props) => {
  const { app } = props;
  const items = useItems(app);
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
    <div
      className="flex flex-row items-start gap-md rounded-xl border border-transparent bg-card p-lg hover:border-border"
      key={app.id}
    >
      <Avatar
        className="size-20 rounded-md bg-muted [&>span]:rounded-md"
        fallback={app.appKey.charAt(0)}
        src={app.logo}
      />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-xs font-bold text-md">
          <span>{app.name}</span>
          {!app.enable ? (
            <Badge className="text-destructive" variant="outline">
              {t("禁用")}
            </Badge>
          ) : null}
        </div>
        <div className="text-muted-foreground text-sm">{app.appKey}</div>
      </div>
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
    </div>
  );
};
