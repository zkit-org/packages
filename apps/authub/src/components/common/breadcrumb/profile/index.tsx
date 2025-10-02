import type { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@easykit/design";
import { AppBreadcrumb } from "..";

export type BreadcrumbBase = PropsWithChildren;

export const ProfileBreadcrumbBase: FC<BreadcrumbBase> = (props) => {
  const { t } = useTranslation();

  return (
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href={`/profile`}>{t("个人资料")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      {props.children}
    </AppBreadcrumb>
  );
};
