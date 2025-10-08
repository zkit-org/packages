"use client";

import { useTranslation } from "react-i18next";

import { UsersBreadcrumb } from "@/components/common/breadcrumb/users";
import { Coming } from "@/components/common/coming";
import { MainPage } from "@/components/common/page";
import { PageHeader } from "@/components/common/page/header";
import { TitleBar } from "@/components/common/page/title-bar";
import { useLayoutConfig } from "@/components/layout/hooks";
import type { MainLayoutProps } from "@/components/layout/main";

export const UsersPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "users",
  });
  const { t } = useTranslation();
  const title = t("用户");
  return (
    <MainPage>
      <PageHeader>
        <UsersBreadcrumb />
        <TitleBar title={title} />
      </PageHeader>
      <Coming />
    </MainPage>
  );
};
