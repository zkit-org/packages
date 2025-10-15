import type { FC, PropsWithChildren } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { AppLayout } from "@/components/layout/app";
import { detail } from "@/rest/app";
import { prefetchQuery } from "@/utils/query";

export type LayoutProps = PropsWithChildren<{
  params: Promise<{
    id: string;
  }>;
}>;

const Layout: FC<LayoutProps> = async (props) => {
  const { id } = await props.params;

  // 使用自定义的 prefetchQuery，与 useQuery 保持一致的数据处理逻辑
  const queryClient = await prefetchQuery({
    queryKey: ["app", id],
    queryFn: ({ queryKey }) => detail(Number(queryKey[1])),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <AppLayout id={id}>{props.children}</AppLayout>
    </HydrationBoundary>
  );
};
export default Layout;
