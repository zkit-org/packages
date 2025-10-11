import { useTranslation } from "react-i18next";

import type { TabsTitleItem } from "@/components/common/tabs-title";

export const useAppTabs = (): TabsTitleItem[] => {
  const { t } = useTranslation();
  return [
    {
      id: "detail",
      title: t("概要"),
    },
    {
      id: "members",
      title: t("用户"),
    },
    {
      id: "oauth",
      title: t("快捷登录"),
    },
  ];
};
