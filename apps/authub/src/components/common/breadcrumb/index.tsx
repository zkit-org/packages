import type { FC, PropsWithChildren } from "react";
import { House } from "lucide-react";
import Link from "next/link";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@easykit/design";

export type AppBreadcrumbProps = PropsWithChildren<{
  homeUrl?: string;
}>;

export const AppBreadcrumb: FC<AppBreadcrumbProps> = (props) => {
  const { homeUrl = "/" } = props;

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-1 sm:gap-1">
        <BreadcrumbItem className="leading-4">
          <Link href={homeUrl}>
            <House className="size-4" />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {props.children}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
