import type { Metadata } from "next";

import { st } from "@/utils/locale.server";
import { keywords, title } from "@/utils/seo";
import { LoginPage } from "./components";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("登录")),
    keywords: await keywords(),
  };
}

export default function Page() {
  return <LoginPage />;
}
