import type { FC, PropsWithChildren } from "react";
import { notFound } from "next/navigation";

import { AppLayout } from "@/components/layout/app";
import { detail } from "@/rest/app";

export type LayoutProps = PropsWithChildren<{
  params: Promise<{
    id: string;
  }>;
}>;

const Layout: FC<LayoutProps> = async (props) => {
  const { id } = await props.params;
  const { success, data } = await detail(Number(id));
  if (!success) {
    return notFound();
  }
  return <AppLayout {...props} app={data} />;
};
export default Layout;
