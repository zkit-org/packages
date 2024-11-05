import type { Metadata } from "next";
import "@/plugin/locales";
import "./globals.css";

export const metadata: Metadata = {
    title: "Editor Playground",
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
