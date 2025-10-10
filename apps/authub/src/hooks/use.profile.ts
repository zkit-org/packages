import { useAtomValue } from "jotai";

import { profileState } from "@/state/public";

export const useProfile = () => {
  return useAtomValue(profileState);
};
