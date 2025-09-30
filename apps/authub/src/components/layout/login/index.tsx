"use client";

import type { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import { Button, Divider } from "@easykit/design";
import Iridescence from "@/components/background/iridescence";

export const LoginLayout: FC<PropsWithChildren> = (props) => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen items-stretch">
      <div className="relative hidden flex-1 items-stretch justify-center bg-primary lg:flex">
        <div className="absolute inset-0 overflow-hidden">
          <Iridescence amplitude={0.5} color={[0.1, 0.2, 0.8]} mouseReact={false} speed={0.5} />
        </div>
        <div className="relative z-10 flex w-full flex-col items-start justify-end gap-md p-16 text-white">
          <div className="font-bold text-4xl">Authub</div>
          <div className="text-md">
            <ul className="ml-md list-disc">
              <li>多租户统一授权中心</li>
              <li>支持OAuth2.0、OIDC、SAML、CAS等协议</li>
              <li>支持LDAP、AD、CAS等认证方式</li>
              <li>支持多种认证方式</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex w-full min-w-auto items-center justify-center lg:w-2/5 lg:min-w-[600px]">
        <div className="flex flex-col items-center justify-center gap-3xl [&>div]:w-full">
          <div className="font-bold text-3xl">Authub</div>
          <div>{props.children}</div>
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
        </div>
      </div>
    </div>
  );
};
