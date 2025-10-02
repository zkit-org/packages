import type { Metadata } from "next";

import { st } from "@/utils/locale.server";
import { keywords, title } from "@/utils/seo";
import { MFAPage } from "./components";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("二次验证")),
    keywords: await keywords(),
  };
}

const Page = () => <MFAPage />;

export default Page;
