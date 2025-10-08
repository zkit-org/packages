import type { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@easykit/design";
import { AppBreadcrumb } from "..";

export type BreadcrumbProps = PropsWithChildren;

export const AppsBreadcrumb: FC<BreadcrumbProps> = (props) => {
  const { children } = props;
  const { t } = useTranslation();

  return (
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href={`/apps`}>{t("应用")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {children && <BreadcrumbSeparator />}
      {children}
    </AppBreadcrumb>
  );
};
