"use client";

import { type FC, type PropsWithChildren, useEffect, useMemo } from "react";
import classNames from "classnames";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import { isLoginState } from "@/state/public";
import { LoadingLayout } from "../loading";
import { Footer, type FooterProps } from "./footer";
import { Header, type HeaderProps } from "./header";

export type MainLayoutProps = PropsWithChildren<{
  className?: string;
  container?: boolean;
  bodyClassName?: string;
  footerProps?: FooterProps;
  headerProps?: HeaderProps;
}>;

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { className, children, container = true, bodyClassName, footerProps, headerProps } = props;
  const isLogin = useAtomValue(isLoginState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin]);

  const loading = useMemo(() => !isLogin, [isLogin]);

  return (
    <>
      <div className={classNames("flex min-h-[100vh] flex-col items-center justify-center", className)}>
        <Header {...headerProps} />
        <div className={classNames("w-full flex-1", bodyClassName)}>
          {container ? <div className="container py-4">{children}</div> : children}
        </div>
        <Footer {...footerProps} />
      </div>
      {loading ? <LoadingLayout /> : null}
    </>
  );
};
