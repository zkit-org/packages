import type { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";

import { HTMLLayout } from "@/components/layout/html";
import { RootLayout } from "@/components/layout/root";
import "@/plugin/rest.server";
import "@/plugin/locales";
import "@/assets/style/index.css";

import { profile } from "@/rest/auth";
import { getLocale } from "@/utils/locale.server";
import { getTheme } from "@/utils/theme.server";

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

const loadInitialData = async () => {
  const locale = await getLocale();
  const theme = await getTheme();
  const { success, data } = await profile();
  const profileData = success ? data : null;
  const initialData = { locale, theme, profileData, isLogin: success ?? false };
  return initialData;
};

const Layout: FC<LayoutProps> = async (props) => {
  const initialData = await loadInitialData();
  const { locale, theme, profileData, isLogin } = initialData;
  return (
    <HTMLLayout>
      <RootLayout isLogin={isLogin} locale={locale} profile={profileData ?? null} theme={theme}>
        {props.children}
      </RootLayout>
    </HTMLLayout>
  );
};

export default Layout;
