import { useTranslation } from "react-i18next";
import { object, string, type z } from "zod";

export const useSchema = () => {
  const { t } = useTranslation();
  return object({
    logo: string().optional(),
    appKey: string().min(1, t("请输入应用标识")),
    name: string().min(1, t("请输入应用名称")),
    memo: string().optional(),
    callbackUrl: string().url(t("请输入正确的回调地址")),
  }).superRefine(({ appKey }, ctx) => {
    // 只能使用小写字母、数字和-
    if (!/^[a-z0-9-]+$/.test(appKey)) {
      ctx.addIssue({
        code: "custom",
        path: ["appKey"],
        message: t("应用标识只能使用小写字母、数字和-"),
      });
    }
  });
};

export type AddAppFormData = z.infer<ReturnType<typeof useSchema>>;
