import i18next from "i18next";

export const i18n = (key: string) => {
  return i18next.t(key, { ns: "editor" });
};
