import { type FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai/index";
import { useTranslation } from "react-i18next";
import { object, string } from "zod";

import { Button, Dialog, Form, FormItem, useMessage } from "@easykit/design";
import { EmailCodeInput } from "@/components/common/input/email-code";
import { type SendEmailCodeData, sendEmailCode } from "@/rest/common";
import { otpDisable } from "@/rest/profile/security/mfa";
import { profileState } from "@/state/public";
import { t } from "@/utils/locale.client";
import { CODE } from "@/utils/regular";

const getSchema = () =>
  object({
    code: string().min(1, t("请输入邮箱验证码")).regex(CODE, t("请输入6位数字验证码")),
  });

export type DisableModalProps = {
  onSuccess?: () => void;
};

export const DisableModal: FC<DisableModalProps> = (props) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const title = t("禁用二次验证");
  const account = useAtomValue(profileState);
  const m = useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: otpDisable,
    onSuccess: () => {
      setVisible(false);
      props.onSuccess?.();
    },
    onError: (error) => m.error(error.message),
  });

  return (
    <p>
      <button className="cursor-pointer" onClick={() => setVisible(true)} type="button">
        {title}
      </button>
      <Dialog maskClosable={false} onCancel={() => setVisible(false)} title={title} visible={visible}>
        <Form onSubmit={(data) => mutate(data)} schema={getSchema()}>
          <FormItem
            label={t("邮箱验证码（{{email}}）", {
              email: account?.email,
            })}
            name="code"
          >
            <EmailCodeInput<SendEmailCodeData>
              api={sendEmailCode}
              data={{ action: "otp-disable", email: account?.email ?? "" }}
              placeholder={t("请输入邮箱验证码")}
            />
          </FormItem>
          <Button loading={isPending} long type="submit">
            {t("禁用")}
          </Button>
        </Form>
      </Dialog>
    </p>
  );
};
