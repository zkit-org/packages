import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { CopyIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";

import { Image, Popover, PopoverContent, PopoverTrigger, useMessage } from "@easykit/design";

export interface OtpInfoProps extends PropsWithChildren {
  secret?: string;
  qrcode?: string;
  loading?: boolean;
}

const useApps = () => {
  const { t } = useTranslation();
  return [
    {
      name: t("腾讯身份验证器"),
      icon: "/assets/image/2fa/tencent.webp",
    },
    {
      name: t("谷歌身份验证器"),
      icon: "/assets/image/2fa/google.webp",
    },
    {
      name: t("微软身份验证器"),
      icon: "/assets/image/2fa/microsoft.webp",
    },
  ];
};

export const OtpInfo: FC<OtpInfoProps> = (props) => {
  const { secret, qrcode } = props;
  const msg = useMessage();
  const [qrcodeImage, setQrcodeImage] = useState("");
  const { t } = useTranslation();
  const apps = useApps();

  useEffect(() => {
    qrcode &&
      import("qrcode").then((QRCode) => {
        QRCode.toDataURL(qrcode).then((result) => {
          setQrcodeImage(result);
        });
      });
  }, [qrcode]);

  const onCopy = () => {
    msg.success(t("复制成功"));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center">
        {qrcodeImage ? (
          <Image alt="QRCode" height={150} src={qrcodeImage} width={150} />
        ) : (
          <div className="h-[150px] w-[150px] bg-secondary" />
        )}
      </div>
      <div className="my-2 flex items-center justify-center bg-secondary px-3 py-1 text-sm">
        {secret || "--"}
        <CopyToClipboard onCopy={onCopy} text={secret || ""}>
          <CopyIcon className="ml-[10px]" />
        </CopyToClipboard>
      </div>
      <div className="flex items-center justify-center text-center">
        <Popover>
          <PopoverTrigger asChild={true}>
            <InfoCircledIcon className="mr-2" />
          </PopoverTrigger>
          <PopoverContent className="w-[300px]">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{t("支持主流的验证器")}</h4>
              <p className="text-muted-foreground text-sm">{t("请在应用市场下载适合您手机的应用使用")}</p>
              <div className="space-y-2">
                {apps.map((app) => {
                  return (
                    <div className="flex items-center space-x-2" key={app.name}>
                      <Image
                        alt={app.name}
                        className="overflow-hidden rounded-md shadow"
                        height={32}
                        src={app.icon}
                        width={32}
                      />
                      <span>{app.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <span className="text-left text-sm">{t("使用身份验证应用，扫码二维码或复制密钥到应用。")}</span>
      </div>
    </div>
  );
};
