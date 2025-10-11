import { atom } from "jotai";

import type { AppResponse } from "@/types/app";

export const currentAppState = atom<AppResponse | undefined>(undefined);
