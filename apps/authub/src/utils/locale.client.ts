import i18next from "i18next";

export const t = (key: string, vars?: Record<string, string>) => {
  return i18next?.t(key, { ns: "translation", ...(vars || {}) });
}

export const tk = (key: string) => key

// biome-ignore lint/suspicious/noExplicitAny: params
export const i18n = (input: string, params: any) => {
  if (!params) return input
  let result = input
  for (const key of Object.keys(params)) {
    result = result.replace(new RegExp(`%${key}`, 'gm'), params[key])
  }
  return result
}