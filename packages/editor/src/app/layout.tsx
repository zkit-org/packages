import type {Metadata} from "next";
import "@/plugin/locales";
import {MainLayout} from '@/components/layout/main';
import type { ReactNode } from 'react'
import '@easykit/design/style.css'
import '../../lib/style/tailwind.css'

export const metadata: Metadata = {
  title: 'Editor Playground',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
