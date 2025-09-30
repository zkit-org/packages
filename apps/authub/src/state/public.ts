import { atom } from "jotai";

import type { Profile } from "@/types/account";

export const localeState = atom<string>("zh-cn");

export const isLoginState = atom<boolean>(false);

export const profileState = atom<Profile | null>(null);
