import type { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

import { HTMLLayout } from "@/components/layout/html";
import { RootLayout } from "@/components/layout/root";
import "@/plugin/rest.server";
import "@/plugin/locales";
import "@/assets/style/index.css";

import { loadInitialData } from "@/utils/layout";

export type LayoutProps = PropsWithChildren;

export const metadata: Metadata = {
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    other: [{ url: "/site.webmanifest", rel: "manifest" }],
  },
};

const Layout: FC<LayoutProps> = async (props) => {
  const initialData = await loadInitialData();
  const { locale, theme, profileData, isLogin, configData } = initialData;
  return (
    <HTMLLayout>
      <RootLayout
        config={configData}
        isLogin={isLogin ?? false}
        locale={locale}
        profile={profileData ?? null}
        theme={theme}
      >
        {props.children}
      </RootLayout>
    </HTMLLayout>
  );
};

export default Layout;
