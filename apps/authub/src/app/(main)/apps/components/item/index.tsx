import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Avatar, Badge } from "@easykit/design";
import { AppItemMenus } from "@/components/common/page/app/item-menus";
import type { AppListResponse } from "@/types/app";

export type AppItemProps = {
  app: AppListResponse;
};

export const AppItem: FC<AppItemProps> = (props) => {
  const { app } = props;
  const { t } = useTranslation();

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
      <AppItemMenus app={app} />
    </div>
  );
};
