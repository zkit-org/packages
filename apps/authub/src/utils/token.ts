import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { getRootDomain } from ".";

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export interface Token {
  token: string;
  expiresIn: number;
}

export const setToken = (data: Token) => {
  setCookie("token", JSON.stringify(data), {
    maxAge: COOKIE_MAX_AGE,
    domain: getRootDomain(window.location.hostname),
  });
};

export const clearToken = () => {
  deleteCookie("token");
};

// biome-ignore lint/suspicious/noExplicitAny: getToken
export const getToken = async (cookies?: any): Promise<Token | null> => {
  const token = await getCookie("token", { cookies });
  let tokenData: Token | null = null;
  if (token) {
    try {
      tokenData = JSON.parse(token);
    } catch {
      // 忽略解析错误，tokenData 保持为 null
    }
  }
  return tokenData;
};
