"use client";

import { useMemo, useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { Empty, Pagination } from "@easykit/design";
import { AppsBreadcrumb } from "@/components/common/breadcrumb/apps";
import { MainPage } from "@/components/common/page";
import { PageHeader } from "@/components/common/page/header";
import { TitleBar } from "@/components/common/page/title-bar";
import { useLayoutConfig } from "@/components/layout/hooks";
import type { MainLayoutProps } from "@/components/layout/main";
import { useQuery } from "@/hooks";
import { list } from "@/rest/app";
import { AddButton } from "./add/button";
import { AppItem } from "./item";
import { AppItemLoading } from "./item/loading";

export const AppsPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "apps",
  });
  const { t } = useTranslation();
  const title = t("应用");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const actions = <AddButton />;
  const { data, isLoading } = useQuery({
    queryKey: ["apps", page, size],
    queryFn: ({ queryKey }) =>
      list({
        page: queryKey[1] as number,
        size: queryKey[2] as number,
      }),
    placeholderData: keepPreviousData,
  });
  const apps = useMemo(() => data?.data ?? [], [data]);
  return (
    <MainPage>
      <PageHeader>
        <AppsBreadcrumb />
        <TitleBar actions={actions} title={title} />
      </PageHeader>
      <div className="container flex flex-col gap-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [1, 2, 3].map((item) => <AppItemLoading key={item} />)
          ) : apps.length > 0 ? (
            apps.map((app) => <AppItem app={app} key={app.id} />)
          ) : (
            <Empty text={t("暂无应用")} />
          )}
        </div>
        <Pagination onChange={setPage} onSizeChange={setSize} page={page} size={size} total={data?.total ?? 0} />
      </div>
    </MainPage>
  );
};
