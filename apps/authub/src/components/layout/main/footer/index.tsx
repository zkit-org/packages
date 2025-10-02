import type { FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Separator } from "@easykit/design";
import GithubIcon from "@/assets/icons/github.svg";
import XIcon from "@/assets/icons/x.svg";
import { LangSelect } from "@/components/common/select/lang";
import { ThemeSwitcher } from "@/components/common/theme-switcher";

export type FooterProps = {
  enable?: boolean;
  border?: boolean;
  className?: string;
};

export const Footer: FC<FooterProps> = (props) => {
  const { enable = true, className, border = true } = props;
  const { t } = useTranslation();
  if (!enable) return null;
  return (
    <div
      className={classNames(
        "container flex flex-col items-center justify-center pb-lg",
        border ? "border-t pt-lg dark:border-secondary dark:border-white/10" : "border-transparent",
        className,
      )}
    >
      <div className="flex w-full">
        <div className="flex flex-1 items-center justify-start space-x-lg">
          <div>© 2025 {t("Authub")}</div>
          <div className="flex items-center justify-start space-x-sm">
            <GithubIcon className="text-2xl text-secondary-foreground/70" fill="currentColor" />
            <Separator className="h-4" orientation="vertical" />
            <XIcon className="text-secondary-foreground/70 text-xl" fill="currentColor" />
          </div>
        </div>
        <div className="flex space-x-sm">
          <ThemeSwitcher size="sm" />
          <LangSelect className="!h-3xl" />
        </div>
      </div>
    </div>
  );
};
