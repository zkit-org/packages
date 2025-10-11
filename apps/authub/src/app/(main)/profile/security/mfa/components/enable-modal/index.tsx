import { type FC, useState } from "react";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import { object, string } from "zod";

import { Button, Dialog, Form, FormItem, useMessage } from "@easykit/design";
import { CodeInput } from "@/components/common/input/code";
import { EmailCodeInput } from "@/components/common/input/email-code";
import { useMutation } from "@/hooks";
import { type SendEmailCodeData, sendEmailCode } from "@/rest/common";
import { type OTPBindData, otpBind } from "@/rest/profile/security/mfa";
import { profileState } from "@/state/public";
import { t } from "@/utils/locale.client";
import { CODE } from "@/utils/regular";
import SecretItem from "../secret";

const getSchema = () =>
  object({
    code: string().min(1, t("请输入邮箱验证码")).regex(CODE, t("请输入6位数字验证码")),
    otpCode: string().min(1, t("请输入身份验证 App 验证码")).regex(CODE, t("请输入6位数字验证码")),
  });

export type EnableModalProps = {
  onSuccess?: () => void;
};

export const EnableModal: FC<EnableModalProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const title = t("启用二次验证");
  const account = useAtomValue(profileState);
  const m = useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: otpBind,
    onSuccess: () => {
      setVisible(false);
      props.onSuccess?.();
    },
  });

  return (
    <p>
      <button className="cursor-pointer" onClick={() => setVisible(true)} type="button">
        {title}
      </button>
      <Dialog maskClosable={false} onCancel={() => setVisible(false)} title={title} visible={visible}>
        <Form<OTPBindData> onSubmit={(data) => mutate(data)} schema={getSchema()}>
          <SecretItem />
          <FormItem
            label={t("邮箱验证码（{{email}}）", {
              email: account?.email,
            })}
            name="code"
          >
            <EmailCodeInput<SendEmailCodeData>
              api={sendEmailCode}
              data={{ action: "otp-enable", email: account?.email ?? "" }}
              placeholder={t("请输入邮箱验证码")}
            />
          </FormItem>
          <FormItem label={t("验证码")} name="otpCode">
            <CodeInput placeholder={t("请输入身份验证 App 验证码")} />
          </FormItem>
          <Button loading={isPending} long type="submit">
            {t("启用")}
          </Button>
        </Form>
      </Dialog>
    </p>
  );
};
