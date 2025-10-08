"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { BreadcrumbItem, BreadcrumbPage, Card } from "@easykit/design";
import { ProfileBreadcrumb } from "@/components/common/breadcrumb/profile";
import { MainPage } from "@/components/common/page";
import { PageHeader } from "@/components/common/page/header";
import { TitleBar } from "@/components/common/page/title-bar";
import { useLayoutConfig } from "@/components/layout/hooks";
import type { MainLayoutProps } from "@/components/layout/main";
import { Password } from "./password";

export const SecurityPage = () => {
  const { t } = useTranslation();
  const title = t("安全设置");
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  });

  return (
    <MainPage>
      <PageHeader>
        <ProfileBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </ProfileBreadcrumb>
        <TitleBar title={title} />
      </PageHeader>
      <div className="container flex flex-col gap-md">
        <Password />
        <Card title={t("二次验证")}>
          <div className="space-y-2">
            <p>{t("通过第二个登录步骤确保您的帐户更加安全。")}</p>
            <p>
              <Link href="/profile/security/mfa">{t("管理二次验证")}</Link>
            </p>
          </div>
        </Card>
      </div>
    </MainPage>
  );
};
