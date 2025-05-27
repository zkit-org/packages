'use client'
import {ThemeSwitcher} from "@/components/theme-switcher";
import { ThemeProvider } from 'next-themes'
import type { FC, PropsWithChildren } from 'react'

export const MainLayout: FC<PropsWithChildren> = (props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div>
        <div className="flex items-center justify-end p-4">
          <ThemeSwitcher />
        </div>
        <div>{props.children}</div>
      </div>
    </ThemeProvider>
  )
}
