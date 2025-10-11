import { profile } from "@/rest/auth";
import { common } from "@/rest/config";
import { getLocale } from "@/utils/locale.server";
import { getTheme } from "@/utils/theme.server";

export const loadInitialData = async () => {
  const locale = await getLocale();
  const theme = await getTheme();
  const { success, data: profileData } = await profile();
  const { data: configData } = await common();
  const isLogin = success;
  const initialData = { locale, theme, profileData, isLogin, configData };
  return initialData;
};
