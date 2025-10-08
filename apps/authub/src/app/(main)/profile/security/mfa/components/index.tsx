"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import {
  Badge,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Card,
  Separator,
  Skeleton,
  time,
} from "@easykit/design";
import { ProfileBreadcrumb } from "@/components/common/breadcrumb/profile";
import { MainPage } from "@/components/common/page";
import { PageHeader } from "@/components/common/page/header";
import { TitleBar } from "@/components/common/page/title-bar";
import { useLayoutConfig } from "@/components/layout/hooks";
import type { MainLayoutProps } from "@/components/layout/main";
import { otpStatus } from "@/rest/profile/security/mfa";
import { DisableModal } from "./disable-modal";
import { EnableModal } from "./enable-modal";

export const MFAPage = () => {
  const { t } = useTranslation();
  const title = t("二次验证");
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  });
  const client = useQueryClient();
  const { data: result, isLoading } = useQuery({
    queryFn: otpStatus,
    queryKey: ["profile:mfa"],
  });

  const onSuccess = () => client.invalidateQueries({ queryKey: ["profile:mfa"] });

  const statusTitle = (
    <div className="flex items-center justify-start space-x-sm">
      <span>{title}</span>
      {isLoading ? (
        <Skeleton className="h-6 w-16" />
      ) : (
        <Badge variant={result?.enable ? "default" : "outline"}>{result?.enable ? t("已启用") : t("未启用")}</Badge>
      )}
    </div>
  );

  return (
    <MainPage>
      <PageHeader>
        <ProfileBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild={true}>
              <Link href="/profile/security">{t("安全设置")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </ProfileBreadcrumb>
        <TitleBar title={statusTitle} />
      </PageHeader>
      <div className="container">
        <Card>
          <div className="space-y-4">
            <div>
              {result?.enable ? (
                <>
                  <p>{t("您已通过增加第二个登录步骤确保您的帐户更加安全，起始时间：")}</p>
                  <p className="mb-sm font-bold">{time(result?.enableTime)}</p>
                </>
              ) : null}
              <p>
                {t(
                  "如果您使用 Google、Microsoft 或 SAML 单一登录进行登录，则不会采用双重验证。我们建议您使用 Google 或身份提供程序的双重验证。",
                )}
              </p>
            </div>
            <Separator />
            {isLoading ? (
              <Skeleton className="h-6 w-28" />
            ) : result?.enable ? (
              <DisableModal onSuccess={onSuccess} />
            ) : (
              <EnableModal onSuccess={onSuccess} />
            )}
          </div>
        </Card>
      </div>
    </MainPage>
  );
};
