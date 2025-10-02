import { type FC, type ReactNode, useCallback, useMemo } from "react";
import classNames from "classnames";
import { useAtom } from "jotai/index";
import { Info, Settings } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Action, Button } from "@easykit/design";
import Logo from "@/components/common/logo";
import { isLoginState } from "@/state/public";
import { Notice } from "./notice";
import { ProfileMenu } from "./profile-menu";

export type HeaderProps = {
  extra?: ReactNode;
  appName?: string;
  profileExtra?: ReactNode;
  className?: string;
  logoUrl?: string;
};

export const Header: FC<HeaderProps> = (props) => {
  const { logoUrl, extra, appName = "Authub", profileExtra, className } = props;
  const [isLogin] = useAtom(isLoginState);
  const { t } = useTranslation();

  const logo = useMemo(() => {
    return (
      <div className="flex items-center rounded-md bg-primary pr-xs">
        <Logo iconClassName="bg-white rounded-md" size={36} />
        {appName ? (
          <span className="rounded-md bg-primary px-1 py-0.5 font-bold text-lg text-white">{appName}</span>
        ) : null}
      </div>
    );
  }, [appName]);

  const goLogin = useCallback(() => {
    location.href = `/login?redirect=${encodeURIComponent(location.href)}`;
  }, []);

  const goRegister = useCallback(() => {
    location.href = `/register?redirect=${encodeURIComponent(location.href)}`;
  }, []);

  return (
    <div
      className={classNames(
        "flex h-[var(--layout-header-height)] w-full items-center justify-center border-b p-sm",
        className,
      )}
    >
      <div className="flex flex-1 items-center justify-start space-x-2xl">
        <div className="flex items-center justify-center space-x-sm">
          {logoUrl ? <Link href={logoUrl}>{logo}</Link> : logo}
        </div>
        <div className="flex-1">{extra}</div>
      </div>
      <div className="flex items-center justify-center space-x-xs">
        {isLogin ? (
          <>
            <Notice />
            <Action className="!outline-none">
              <Settings className="size-4" />
            </Action>
            <Action className="!outline-none">
              <Info className="size-4" />
            </Action>
            <ProfileMenu extra={profileExtra} />
          </>
        ) : (
          <>
            <Button onClick={goLogin} size="sm">
              {t("登录")}
            </Button>
            <Button onClick={goRegister} size="sm" variant="outline">
              {t("注册")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
