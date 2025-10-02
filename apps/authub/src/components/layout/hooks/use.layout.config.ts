import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { layoutConfigState } from "@/state/layout";

export const useLayoutConfig = <T>(config: T) => {
  const setConfig = useSetAtom(layoutConfigState);
  useEffect(() => {
    setConfig(config);
    return () => {
      setConfig(null);
    };
  }, [config, setConfig]);
};
