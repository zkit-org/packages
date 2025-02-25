import type {Metadata} from "next";
import "@/plugin/locales";
import {MainLayout} from '@/components/layout/main';
import {ReactNode} from 'react';

export const metadata: Metadata = {
  title: "Editor Playground",
};

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
