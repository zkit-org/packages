import { useTranslation } from "react-i18next";
import { object, string, type z } from "zod";

import { PASSWORD } from "@/utils/regular";

export const useSchema = () => {
  const { t } = useTranslation();
  return object({
    originPassword: string().min(1, t("请输入密码")).regex(PASSWORD, t("密码格式不正确")),
    password: string().min(1, t("请输入密码")).regex(PASSWORD, t("密码格式不正确")),
    passwordConfirm: string().min(1, t("请输入密码")).regex(PASSWORD, t("密码格式不正确")),
  }).superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: t("两次密码输入不一致"),
      });
    }
  });
};

export type PasswordFormData = z.infer<ReturnType<typeof useSchema>>;
