import type { ComponentProps, ReactNode } from "react";

import { cn } from "@easykit/design/lib";
import { Alert as UIAlert, AlertDescription as UIAlertDescription, AlertTitle as UIAlertTitle } from "../../ui/alert";

export type AlertProps = ComponentProps<typeof UIAlert> & {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
};

export const Alert = (props: AlertProps) => {
  const {
    title,
    description,
    icon,
    children: childrenProp,
    titleClassName,
    descriptionClassName,
    variant,
    ...rest
  } = props;

  let className = props.className;
  const children = childrenProp || description;

  if (variant === "destructive") {
    className = cn("border-destructive/20 bg-destructive/10 text-destructive", className);
  }

  return (
    <UIAlert {...rest} className={cn("flex gap-2", className)} variant={variant}>
      {icon}
      <div className="flex flex-1 flex-col gap-2">
        {title && <UIAlertTitle className={titleClassName}>{title}</UIAlertTitle>}
        {children && <UIAlertDescription className={descriptionClassName}>{children}</UIAlertDescription>}
      </div>
    </UIAlert>
  );
};
