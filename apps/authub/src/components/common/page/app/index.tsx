"use client";

import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { notFound, useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Badge, BreadcrumbItem, Button } from "@easykit/design";
import { AppsBreadcrumb } from "@/components/common/breadcrumb/apps";
import { MainPage } from "@/components/common/page";
import { PageHeader } from "@/components/common/page/header";
import { TitleBar } from "@/components/common/page/title-bar";
import { TabsTitle } from "@/components/common/tabs-title";
import { useLayoutConfig } from "@/components/layout/hooks";
import type { MainLayoutProps } from "@/components/layout/main";
import { currentAppState } from "@/state/app";
import { useAppTabs } from "./config";
import { AppItemMenus } from "./item-menus";

export type AppLayoutProps = PropsWithChildren<{
  active: string;
}>;

export const AppPage: FC<AppLayoutProps> = (props) => {
  useLayoutConfig<MainLayoutProps>({
    active: "apps",
  });
  const { t } = useTranslation();
  const { id } = useParams();
  const tabs = useAppTabs();
  const router = useRouter();
  const [active, setActive] = useState(props.active ?? "detail");
  const app = useAtomValue(currentAppState);

  useEffect(() => {
    router.push(`/apps/${id}/${active}`);
  }, [active, id]);

  const title = (
    <div className="flex items-center gap-2">
      <span>{app?.name}</span>
      {!app?.enable ? (
        <Badge className="text-destructive" variant="outline">
          {t("禁用")}
        </Badge>
      ) : null}
    </div>
  );

  const actions = (
    <div className="flex items-center gap-2">
      <Button size="sm">{t("编辑")}</Button>
      <AppItemMenus app={app!} />
    </div>
  );

  return app ? (
    <MainPage className="gap-md">
      <PageHeader>
        <AppsBreadcrumb>
          <BreadcrumbItem>{t("详情")}</BreadcrumbItem>
        </AppsBreadcrumb>
        <TitleBar actions={actions} title={title} />
        <TabsTitle active={active} className="-mb-md" items={tabs} onChange={setActive} />
      </PageHeader>
      <div className="container flex flex-col gap-md">{props.children}</div>
    </MainPage>
  ) : (
    notFound()
  );
};
