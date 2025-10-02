import type { Metadata } from "next";

import { st } from "@/utils/locale.server";
import { keywords, title } from "@/utils/seo";
import { Profile } from "./components";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("个人资料")),
    keywords: await keywords(),
  };
}

export default Profile;
