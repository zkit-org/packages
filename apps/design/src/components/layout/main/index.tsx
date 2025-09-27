'use client'

import type { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { ConfigProvider } from '@easykit/design'
import zhCN from '@easykit/design/locales/zh-cn'
import { ThemeSwitcher } from '@/components/theme-switcher'

export const MainLayout: FC<PropsWithChildren> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
        <div>
          <div className="flex items-center justify-end p-4">
            <ThemeSwitcher />
          </div>
          <div>{props.children}</div>
        </div>
      </ThemeProvider>
    </ConfigProvider>
  )
}
