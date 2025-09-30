"use client";

import "@/plugin/rest.client";
import "@/plugin/locales";
import "@/plugin/formatters";

import { type FC, type PropsWithChildren, type ReactNode, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setCookie } from "cookies-next";
import i18next from "i18next";
import type { WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { ThemeProvider, useTheme } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { I18nextProvider } from "react-i18next";

import { ConfigProvider } from "@easykit/design";
import locales from "@/config/locale";
import { getRootDomain, isServer } from "@/utils";
import { getQueryClient } from "@/utils/query";
import "@/plugin/locales";
import { Provider } from "jotai";

import { isLoginState, localeState, profileState } from "@/state/public";
import type { Profile } from "@/types/account";

export type RootLayoutProps = PropsWithChildren<{
  locale: string;
  theme: string;
  isLogin: boolean;
  profile: Profile | null;
}>;

export type AtomValues = Iterable<readonly [WritableAtom<unknown, [any], unknown>, unknown]>;

export type AtomsHydrateProps = {
  atomValues: AtomValues;
  children: ReactNode;
};

export const AtomsHydrate: FC<AtomsHydrateProps> = ({ atomValues, children }) => {
  useHydrateAtoms(new Map(atomValues));
  return children;
};

export const ThemeSyncProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme) {
      setCookie("theme", theme, {
        domain: getRootDomain(window.location.hostname),
      });
    }
  }, [theme]);
  return children;
};

export const RootLayout: FC<RootLayoutProps> = (props) => {
  const { locale, theme, children, isLogin, profile } = props;

  i18next.changeLanguage(locale);
  const queryClient = getQueryClient();
  if (!isServer) {
    localStorage.removeItem("theme");
  }

  return (
    <Provider>
      <AtomsHydrate
        atomValues={[
          [localeState, locale],
          [isLoginState, isLogin],
          [profileState, profile],
        ]}
      >
        <NuqsAdapter>
          <I18nextProvider defaultNS="translation" i18n={i18next}>
            <ConfigProvider locale={locales[locale]}>
              <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
                <ThemeSyncProvider>
                  <QueryClientProvider client={queryClient}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                  </QueryClientProvider>
                </ThemeSyncProvider>
              </ThemeProvider>
            </ConfigProvider>
          </I18nextProvider>
        </NuqsAdapter>
      </AtomsHydrate>
    </Provider>
  );
};
