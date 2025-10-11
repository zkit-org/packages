"use client";

import { useCallback, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import isUndefined from "lodash/isUndefined";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button, Divider, Form, FormItem, Input, useMessage } from "@easykit/design";
import { useEncrypt, useMutation } from "@/hooks";
import { type LoginRestData, login } from "@/rest/auth";
import { type LoginFormData, useSchema } from "@/schema/login";
import { RestError } from "@/utils/rest";
import { setToken } from "@/utils/token";
import { MFADialog } from "./mfa-dialog";

export const LoginPage = () => {
  const schema = useSchema();
  const form = Form.useForm<LoginFormData>();
  const { t } = useTranslation();
  const encrypt = useEncrypt();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<LoginRestData | null>(null);
  const msg = useMessage();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setLoading(false);
      if (data) {
        setToken(data);
        location.href = "/";
      }
    },
    onError: (error) => {
      setLoading(false);
      if (error instanceof RestError) {
        const { code, message } = error;
        if (code === 10001) {
          setVisible(true);
        } else {
          msg.error(message);
        }
      } else {
        msg.error(error.message);
      }
    },
  });

  const onSubmit = useCallback(
    (data: LoginRestData, submitting?: boolean) => {
      setLoading(isUndefined(submitting) ? true : submitting);
      setFormData(data);
      const cloneData = cloneDeep(data);
      cloneData.password = encrypt(cloneData.password);
      mutate(cloneData);
    },
    [mutate, encrypt],
  );

  const onCancel = useCallback(() => {
    setVisible(false);
    setFormData(null);
  }, []);

  return (
    <div className="flex w-[360px] flex-col gap-md">
      <Form<LoginFormData> form={form} onSubmit={(data) => onSubmit(data)} schema={schema}>
        <FormItem label={t("用户名")} name="username">
          <Input placeholder={t("请输入用户名")} />
        </FormItem>
        <FormItem label={t("密码")} name="password">
          <Input placeholder={t("请输入密码")} type="password" />
        </FormItem>
        <Button className="mt-sm" loading={loading && isPending} long type="submit">
          {t("登录")}
        </Button>
        <div>
          {t("没有账号？")}
          <Link className="link" href="/register">
            {t("注册")}
          </Link>
        </div>
      </Form>
      <Divider className="my-0" orientation="center">
        {t("第三方快捷登录")}
      </Divider>
      <div className="flex flex-col gap-sm">
        <Button long variant="outline">
          {t("微信登录")}
        </Button>
        <Button long variant="outline">
          {t("Google 登录")}
        </Button>
      </div>
      <MFADialog<LoginRestData>
        formData={formData}
        isPending={isPending}
        onCancel={onCancel}
        onSubmit={onSubmit}
        visible={visible}
      />
    </div>
  );
};
