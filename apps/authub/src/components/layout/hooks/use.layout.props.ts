import { useMemo } from "react";
import { useAtom } from "jotai";

import { layoutConfigState } from "@/state/layout";

export const useLayoutProps = <T>(originProps: T): T => {
  const [config] = useAtom(layoutConfigState);
  return useMemo<T>(() => {
    return {
      ...originProps,
      ...(config as T),
    };
  }, [config, originProps]);
};
