import { useAtom } from "jotai";

import { commonConfigState } from "@/state/config";

export const useCommonConfig = () => {
  const [config] = useAtom(commonConfigState);
  return config;
};
