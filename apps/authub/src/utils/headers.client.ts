import Bowser from "bowser";
import i18next from "i18next";

import { isMobile } from "@/utils";
import { getToken } from "@/utils/token";

export const get = async () => {
  const browser = Bowser.parse(window.navigator.userAgent);
  // biome-ignore lint/suspicious/noExplicitAny: headers
  const headers: any = {
    "Accept-Language": i18next.language,
    "CLIENT-PLATFORM-TYPE": isMobile() ? "H5" : "PC",
    "CLIENT-BUNDLE-ID": location.hostname,
    "CLIENT-DEVICE-MODEL": browser.os.name,
    "CLIENT-SYSTEM-VERSION": browser.os.version,
    "CLIENT-TIMESTAMP": Date.now(),
  };
  const token = await getToken();
  if (token) headers.Authorization = `Bearer ${token.token}`;
  return headers;
};
