"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button, Form, FormItem, Input } from "@easykit/design";
import { type LoginFormData, useSchema } from "@/schema/login";

export const LoginPage = () => {
  const schema = useSchema();
  const form = Form.useForm<LoginFormData>();
  const { t } = useTranslation();

  const onSubmit = useCallback((data: LoginFormData) => {
    console.log(data);
  }, []);

  return (
    <div className="w-[360px]">
      <Form<LoginFormData> form={form} onSubmit={onSubmit} schema={schema}>
        <FormItem label={t("用户名")} name="username">
          <Input placeholder={t("请输入用户名")} />
        </FormItem>
        <FormItem label={t("密码")} name="password">
          <Input placeholder={t("请输入密码")} type="password" />
        </FormItem>
        <Button className="mt-sm" long type="submit">
          {t("登录")}
        </Button>
        <div>
          {t("没有账号？")}
          <Link className="link" href="/register">
            {t("注册")}
          </Link>
        </div>
      </Form>
    </div>
  );
};
