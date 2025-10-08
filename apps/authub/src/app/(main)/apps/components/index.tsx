"use client";

import { useTranslation } from "react-i18next";

import { AppsBreadcrumb } from "@/components/common/breadcrumb/apps";
import { Coming } from "@/components/common/coming";
import { MainPage } from "@/components/common/page";
import { PageHeader } from "@/components/common/page/header";
import { TitleBar } from "@/components/common/page/title-bar";
import { useLayoutConfig } from "@/components/layout/hooks";
import type { MainLayoutProps } from "@/components/layout/main";

export const AppsPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "apps",
  });
  const { t } = useTranslation();
  const title = t("应用");
  return (
    <MainPage>
      <PageHeader>
        <AppsBreadcrumb />
        <TitleBar title={title} />
      </PageHeader>
      <Coming />
    </MainPage>
  );
};
