import { useTranslation } from "react-i18next";
import { object, string, type z } from "zod";

export const useSchema = () => {
  const { t } = useTranslation();
  return object({
    logo: string().optional(),
    name: string().min(1, t("请输入应用名称")),
    memo: string().optional(),
    callbackUrl: string().url(t("请输入正确的回调地址")),
  });
};

export type AddAppFormData = z.infer<ReturnType<typeof useSchema>>;
