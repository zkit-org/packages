import type { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { Button, Dialog, type DialogProps, Form, FormItem, Input, Textarea, useMessage } from "@easykit/design";
import { Cropper } from "@/components/common/cropper";
import { add } from "@/rest/app";
import { type AddAppFormData, useSchema } from "@/schema/app";
import { useAppsReload } from "../../hooks";

export type AddDialogProps = DialogProps;

export const AddDialog: FC<AddDialogProps> = (props) => {
  const { t } = useTranslation();
  const schema = useSchema();
  const form = Form.useForm<AddAppFormData>();
  const msg = useMessage();
  const reload = useAppsReload();

  const { mutate, isPending } = useMutation({
    mutationFn: add,
    onSuccess: () => {
      props.onCancel?.();
      reload();
    },
    onError: (error) => {
      msg.error(error.message);
    },
  });

  const footer = (
    <div className="flex justify-end gap-2">
      <Button loading={isPending} onClick={() => form.submit()}>
        {t("添加")}
      </Button>
      <Button disabled={isPending} onClick={props.onCancel} variant="outline">
        {t("取消")}
      </Button>
    </div>
  );

  return (
    <Dialog {...props} footer={footer} maskClosable={false} title={t("添加应用")}>
      <Form<AddAppFormData> form={form} onSubmit={(data) => mutate(data)} schema={schema}>
        <FormItem label={t("图标")} name="logo">
          <Cropper />
        </FormItem>
        <FormItem label={t("应用标识")} name="appKey">
          <Input placeholder={t("请输入")} />
        </FormItem>
        <FormItem label={t("应用名称")} name="name">
          <Input placeholder={t("请输入")} />
        </FormItem>
        <FormItem label={t("说明")} name="memo">
          <Textarea placeholder={t("请输入")} />
        </FormItem>
        <FormItem label={t("回调地址")} name="callbackUrl">
          <Input placeholder={"请输入，例：https://example.com/callback"} />
        </FormItem>
      </Form>
    </Dialog>
  );
};
