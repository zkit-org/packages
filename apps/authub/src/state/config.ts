import { atom } from "jotai";

import type { CommonConfig } from "@/types/config";

export const commonConfigState = atom<CommonConfig | undefined>(undefined);
