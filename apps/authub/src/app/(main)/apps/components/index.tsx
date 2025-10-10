"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { AppsBreadcrumb } from "@/components/common/breadcrumb/apps";
import { Coming } from "@/components/common/coming";
import { MainPage } from "@/components/common/page";
import { PageHeader } from "@/components/common/page/header";
import { TitleBar } from "@/components/common/page/title-bar";
import { useLayoutConfig } from "@/components/layout/hooks";
import type { MainLayoutProps } from "@/components/layout/main";
import { list } from "@/rest/app";
import { AddButton } from "./add/button";

export const AppsPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "apps",
  });
  const { t } = useTranslation();
  const title = t("应用");
  const actions = <AddButton />;
  const { data } = useQuery({
    queryKey: ["apps"],
    queryFn: () =>
      list({
        page: 1,
        size: 10,
      }),
  });
  console.log(data);
  return (
    <MainPage>
      <PageHeader>
        <AppsBreadcrumb />
        <TitleBar actions={actions} title={title} />
      </PageHeader>
      <Coming />
    </MainPage>
  );
};
