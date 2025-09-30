"use client";

import { type FC, type PropsWithChildren, useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import { isLoginState } from "@/state/public";
import { LoadingLayout } from "../loading";

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const isLogin = useAtomValue(isLoginState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin]);

  return !isLogin ? (
    <LoadingLayout />
  ) : (
    <div>
      <div>main layout</div>
      <div>{props.children}</div>
    </div>
  );
};
