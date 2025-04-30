'use client';
import {ThemeProvider} from "next-themes";
import {FC, PropsWithChildren} from "react";
import {ThemeSwitcher} from "@/components/theme-switcher";
import "@/assets/style/theme.css";

export const MainLayout: FC<PropsWithChildren> = (props) => {
  return <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <div>
      <div className={"p-4 flex justify-end items-center"}>
        <ThemeSwitcher/>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  </ThemeProvider>
}
