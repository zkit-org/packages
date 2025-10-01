import { useTranslation } from "react-i18next";
import { object, string, type z } from "zod";

import { CODE, EMAIL, PASSWORD } from "@/utils/regular";

export const useSchema = () => {
  const { t } = useTranslation();
  const code = t("请输入6位数字验证码");
  return object({
    email: string().min(1, t("请输入正确的邮箱")).regex(EMAIL, t("邮箱格式不正确")),
    code: string().min(1, t("请输入验证码")).regex(CODE, code),
    password: string().min(1, t("请输入密码")).regex(PASSWORD, t("密码格式不正确")),
    password2: string().min(1, t("请输入密码")).regex(PASSWORD, t("密码格式不正确")),
  }).superRefine(({ password, password2 }, ctx) => {
    if (password !== password2) {
      ctx.addIssue({
        code: "custom",
        path: ["password2"],
        message: t("两次密码输入不一致"),
      });
    }
  });
};

export type RegisterFormData = z.infer<ReturnType<typeof useSchema>>;
