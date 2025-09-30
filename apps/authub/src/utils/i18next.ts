import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ReactPostprocessor from "i18next-react-postprocessor";
import Cookies from "js-cookie";
import { setErrorMap } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import enUSZod from "zod-i18n-map/locales/en/zod.json";
import zhCNZod from "zod-i18n-map/locales/zh-CN/zod.json";
import zhTWZod from "zod-i18n-map/locales/zh-TW/zod.json";

import enUSEditor from "@easykit/editor/locales/en-us";
import zhCNEditor from "@easykit/editor/locales/zh-cn";
import zhTWEditor from "@easykit/editor/locales/zh-tw";
import { FALLBACK } from "../config/locale";
import { getRootDomain, isServer } from ".";

const languageDetector = new LanguageDetector();

languageDetector.addDetector({
  name: "cookieCrossDomain",
  lookup: () => {
    return Cookies.get("i18next") || FALLBACK;
  },
  cacheUserLanguage: (lng) => {
    Cookies.set("i18next", lng, {
      domain: isServer ? undefined : getRootDomain(window.location.hostname),
    });
  },
});

export type LangItem = {
  name: string;
  locale: string;
};

// biome-ignore lint/suspicious/noExplicitAny: initI18next Record
export const initI18next = (map: Record<string, any>) => {
  i18next
    .use(new ReactPostprocessor())
    .use(languageDetector)
    .init({
      ns: ["zod", "translation"],
      postProcess: ["reactPostprocessor"],
      resources: {
        "zh-CN": {
          zod: zhCNZod,
          translation: map["zh-CN"],
          editor: zhCNEditor,
        },
        "zh-TW": {
          zod: zhTWZod,
          translation: map["zh-TW"],
          editor: zhTWEditor,
        },
        "en-US": {
          zod: enUSZod,
          translation: map["en-US"],
          editor: enUSEditor,
        },
      },
      interpolation: {
        escapeValue: false,
      },
      detection: {
        caches: ["cookieCrossDomain"],
        order: [
          "cookieCrossDomain",
          "querystring",
          "localStorage",
          "sessionStorage",
          "navigator",
          "htmlTag",
          "path",
          "subdomain",
        ],
      },
    })
    .then();
  setErrorMap(zodI18nMap);
};
