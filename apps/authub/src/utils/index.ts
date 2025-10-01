import { EMAIL } from "./regular";

const isProd = process.env.NODE_ENV === "production";

export const isServer = typeof window === "undefined";

const mobileRegex =
  /(Metalpha|Antalpha|phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;

export function getRootDomain(hostname: string) {
  if (!isProd) {
    return undefined;
  }
  const parts = hostname.split(".");
  if (parts.length >= 2) {
    return `.${parts.slice(-2).join(".")}`;
  }
  return hostname;
}

export function isMobile() {
  if (isServer) return false;
  return !!window.navigator.userAgent.match(mobileRegex);
}

export const isEmail = (text: string) => {
  return EMAIL.test(text);
};
