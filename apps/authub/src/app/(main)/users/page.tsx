import type { Metadata } from "next";

import { st } from "@/utils/locale.server";
import { keywords, title } from "@/utils/seo";
import { UsersPage } from "./components";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("应用")),
    keywords: await keywords(),
  };
}

export default function Page() {
  return <UsersPage />;
}
