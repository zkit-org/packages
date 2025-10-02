"use client";

import { useLayoutConfig } from "@/components/layout/hooks";
import type { MainLayoutProps } from "@/components/layout/main";

export const Profile = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  });
  return <div>profile</div>;
};
