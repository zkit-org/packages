import type { Metadata } from "next";

import { st } from "@/utils/locale.server";
import { keywords, title } from "@/utils/seo";
import { AppsDetailPage } from "./components";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("应用详情")),
    keywords: await keywords(),
  };
}

export default function Page() {
  return <AppsDetailPage />;
}
