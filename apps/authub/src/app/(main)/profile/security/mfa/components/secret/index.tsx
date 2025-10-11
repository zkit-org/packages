import type { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import { FormItem } from "@easykit/design";
import { OtpInfo } from "@/components/common/account/otp-info";
import { useQuery } from "@/hooks";
import { otpSecret } from "@/rest/profile/security/mfa";

export type SecretItemProps = PropsWithChildren;

const SecretItem: FC<SecretItemProps> = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ["profile:mfa:otp:secret"],
    queryFn: otpSecret,
  });

  return (
    <FormItem label={t("身份验证 App 密钥")} name="qrcode">
      <OtpInfo loading={isLoading} qrcode={data?.qrcode} secret={data?.secret} />
    </FormItem>
  );
};

export default SecretItem;
