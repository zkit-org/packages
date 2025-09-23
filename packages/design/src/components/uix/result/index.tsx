import type { FC, PropsWithChildren, ReactNode } from "react";
import { CheckIcon, Cross2Icon, ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@easykit/design/lib";

export interface ResultProps extends PropsWithChildren {
  status: "success" | "error" | "info" | "warning";
  title?: string;
  subTitle?: string;
  extra?: ReactNode;
}

const ICON_MAP = {
  success: CheckIcon,
  error: Cross2Icon,
  info: InfoCircledIcon,
  warning: ExclamationTriangleIcon,
};

export const Result: FC<ResultProps> = (props) => {
  const { status = "info", title, subTitle, extra } = props;

  const Icon = ICON_MAP[status];

  return (
    <div className="flex flex-col items-center justify-center">
      {Icon ? (
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            status === "success" ? "bg-success text-success-foreground" : null,
            status === "error" ? "bg-error text-error-foreground" : null,
            status === "info" ? "bg-secondary text-secondary-foreground" : null,
            status === "warning" ? "bg-warning text-warning-foreground" : null,
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
      {title ? <div className="mt-4 text-lg">{title}</div> : null}
      {subTitle ? <div className="mt-4 text-gray-500">{subTitle}</div> : null}
      {extra ? <div className="mt-4">{extra}</div> : null}
    </div>
  );
};
