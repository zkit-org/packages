import i18next from "i18next";
import zhCN from "../../lib/locales/zh-CN";

i18next.init({
  ns: ["editor"],
  resources: {
    'zh-CN': {
      editor: zhCN,
    },
    'zh-TW': {
      editor: zhCN,
    },
    'en-US': {
      editor: zhCN,
    },
  },
}).then(() => i18next.changeLanguage("zh-CN"));
