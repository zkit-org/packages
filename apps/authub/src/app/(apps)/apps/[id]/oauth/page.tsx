import type { Metadata } from "next";

import { st } from "@/utils/locale.server";
import { keywords, title } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("快捷登录")),
    keywords: await keywords(),
  };
}

export default function Page() {
  return <div>Oauth</div>;
}
