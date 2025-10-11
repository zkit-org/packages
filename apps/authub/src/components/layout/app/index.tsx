"use client";

import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { BreadcrumbItem } from "@easykit/design";
import { AppsBreadcrumb } from "@/components/common/breadcrumb/apps";
import { MainPage } from "@/components/common/page";
import { PageHeader } from "@/components/common/page/header";
import { TitleBar } from "@/components/common/page/title-bar";
import { TabsTitle } from "@/components/common/tabs-title";
import { currentAppState } from "@/state/app";
import type { AppResponse } from "@/types/app";
import { useLayoutProps } from "../hooks";
import { MainLayout } from "../main";
import { useAppTabs } from "./config";

export type AppLayoutProps = PropsWithChildren<{
  app?: AppResponse;
  activeTab?: string;
}>;

export const AppLayout: FC<AppLayoutProps> = (origin) => {
  const props = useLayoutProps<AppLayoutProps>(origin);
  const { app } = props;
  const { t } = useTranslation();
  const setCurrentApp = useSetAtom(currentAppState);
  const tabs = useAppTabs();
  const router = useRouter();
  const [active, setActive] = useState(props.activeTab ?? "detail");

  useEffect(() => {
    setCurrentApp(app);
  }, [app]);

  useEffect(() => {
    router.push(`/apps/${app?.id}/${active}`);
  }, [active]);

  return (
    <MainLayout active="apps">
      <MainPage className="gap-md">
        <PageHeader>
          <AppsBreadcrumb>
            <BreadcrumbItem>{t("详情")}</BreadcrumbItem>
          </AppsBreadcrumb>
          <TitleBar title={app?.name} />
          <TabsTitle active={active} className="-mb-md" items={tabs} onChange={setActive} />
        </PageHeader>
        <div className="container flex flex-col gap-md">{props.children}</div>
      </MainPage>
    </MainLayout>
  );
};
