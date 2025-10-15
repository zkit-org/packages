"use client";

import type { FC, PropsWithChildren } from "react";
import { useLayoutEffect } from "react";
import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

import { useQuery } from "@/hooks";
import { detail } from "@/rest/app";
import { currentAppState } from "@/state/app";

export type AppLayoutProps = PropsWithChildren<{
  id?: string;
}>;

export const AppLayout: FC<AppLayoutProps> = (props) => {
  const { id, children } = props;
  const setCurrentApp = useSetAtom(currentAppState);

  const { data: app } = useQuery({
    queryKey: ["app", id],
    queryFn: ({ queryKey }) => detail(Number(queryKey[1])),
  });

  useHydrateAtoms([[currentAppState, app]]);

  useLayoutEffect(() => {
    setCurrentApp(app);
  }, [app, setCurrentApp]);

  return children;
};
