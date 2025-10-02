import { useCallback, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { cloneDeep } from "es-toolkit";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Card, Form, FormItem, Input, Separator, Space, useMessage } from "@easykit/design";
import bus from "@/events";
import { UNAUTHORIZED } from "@/events/auth";
import { useEncrypt } from "@/hooks";
import { change } from "@/rest/profile/security/password";
import { type PasswordFormData, useSchema } from "@/schema/profile/security/password";

export const Password = () => {
  const { t } = useTranslation();
  const ref = useRef<UseFormReturn<PasswordFormData>>(null);
  const [state, setState] = useState<string>("normal");
  const m = useMessage();
  const encrypt = useEncrypt();
  const schema = useSchema();

  const { mutate, isPending } = useMutation({
    mutationFn: change,
    onSuccess: () => {
      bus.emit(UNAUTHORIZED);
    },
    onError: (error) => {
      console.log(ref, error);
      m.error(error.message);
    },
  });

  const onSubmit = useCallback(
    (data: PasswordFormData) => {
      const cloneData = cloneDeep(data);
      cloneData.originPassword = encrypt(cloneData.originPassword);
      cloneData.password = encrypt(cloneData.password);
      cloneData.passwordConfirm = "";
      mutate(cloneData);
    },
    [mutate, encrypt],
  );

  const cancel = useCallback(() => {
    setState("normal");
  }, []);

  return (
    <Card title={t("更改密码")}>
      <div className="space-y-4">
        <p>{t("当您更改密码后，我们会使您在此设备上保持已登录状态，但可能会将您从其他设备注销。")}</p>
        <Separator />
        {state === "normal" ? (
          <p>
            <button className="cursor-pointer" onClick={() => setState("change")} type="button">
              {t("修改密码")}
            </button>
          </p>
        ) : null}
        {state === "change" ? (
          <Form<PasswordFormData> onSubmit={(data) => onSubmit?.(data as PasswordFormData)} ref={ref} schema={schema}>
            <FormItem label={t("原密码")} name="originPassword">
              <Input className="!w-md" placeholder={t("请输入")} type="password" />
            </FormItem>
            <FormItem label={t("新密码")} name="password">
              <Input className="!w-md" placeholder={t("请输入")} type="password" />
            </FormItem>
            <FormItem label={t("确认新密码")} name="passwordConfirm">
              <Input className="!w-md" placeholder={t("请输入")} type="password" />
            </FormItem>
            <Space>
              <Button loading={isPending} type="submit">
                {t("提交")}
              </Button>
              <Button disabled={isPending} onClick={cancel} variant="outline">
                {t("取消")}
              </Button>
            </Space>
          </Form>
        ) : null}
      </div>
    </Card>
  );
};
