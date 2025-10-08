import { useTranslation } from "react-i18next";

import { Empty } from "@easykit/design";

export const Coming = () => {
  const { t } = useTranslation();
  return <Empty text={t("敬请期待")} />;
};
