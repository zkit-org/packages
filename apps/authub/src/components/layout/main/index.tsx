"use client";

import { type FC, type PropsWithChildren, useEffect, useMemo } from "react";
import classNames from "classnames";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import { isLoginState } from "@/state/public";
import { useLayoutProps } from "../hooks";
import { LoadingLayout } from "../loading";
import { Footer, type FooterProps } from "./footer";
import { Header, type HeaderProps } from "./header";

export type MainLayoutProps = PropsWithChildren<{
  active?: string;
  className?: string;
  container?: boolean;
  bodyClassName?: string;
  footerProps?: FooterProps;
  headerProps?: HeaderProps;
}>;

export const MainLayout: FC<MainLayoutProps> = (origin) => {
  const props = useLayoutProps<MainLayoutProps>(origin);
  const { className, children, container = false, bodyClassName, footerProps, headerProps, active } = props;
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
      <div
        className={classNames(
          "flex min-h-[100vh] flex-col items-center justify-center bg-secondary dark:bg-secondary",
          className,
        )}
      >
        <Header {...headerProps} active={active} />
        <div className={classNames("w-full flex-1", bodyClassName)}>
          {container ? <div className="container py-4">{children}</div> : children}
        </div>
        <Footer {...footerProps} />
      </div>
      {loading ? <LoadingLayout /> : null}
    </>
  );
};
