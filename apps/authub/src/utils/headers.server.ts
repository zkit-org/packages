import { cookies } from "next/headers";

import { getToken } from "@/utils/token";
import { getLocale } from "./locale.server";

export const get = async () => {
  const headers: Record<string, unknown> = {
    "Accept-Language": await getLocale(),
    "CLIENT-PLATFORM-TYPE": "SSR",
    "CLIENT-BUNDLE-ID": "",
    "CLIENT-DEVICE-MODEL": "",
    "CLIENT-SYSTEM-VERSION": "",
    "CLIENT-TIMESTAMP": Date.now(),
  };
  const token = await getToken(cookies);
  if (token) headers.Authorization = `Bearer ${token.token}`;
  return headers;
};
