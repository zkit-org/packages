import type { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@easykit/design";
import { AppBreadcrumb } from "..";

export type BreadcrumbProps = PropsWithChildren;

export const UsersBreadcrumb: FC<BreadcrumbProps> = (props) => {
  const { children } = props;
  const { t } = useTranslation();

  return (
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href={`/users`}>{t("用户")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {children && <BreadcrumbSeparator />}
      {children}
    </AppBreadcrumb>
  );
};
