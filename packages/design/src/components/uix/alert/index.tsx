import type { ComponentProps, ReactNode } from 'react'
import { Alert as UIAlert, AlertDescription as UIAlertDescription, AlertTitle as UIAlertTitle } from "../../ui/alert";

export type AlertProps = ComponentProps<typeof UIAlert> & {
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  children?: ReactNode
  titleClassName?: string
  descriptionClassName?: string
}

export const Alert = (props: AlertProps) => {
  const {
    title,
    description,
    icon,
    children: childrenProp,
    titleClassName,
    descriptionClassName,
    ...rest
  } = props;

  const children = childrenProp || description;

  return (
    <UIAlert {...rest} className="flex gap-2">
      {icon}
      <div className="flex flex-1 flex-col gap-2">
        {title && <UIAlertTitle className={titleClassName}>{title}</UIAlertTitle>}
        {children && <UIAlertDescription className={descriptionClassName}>{children}</UIAlertDescription>}
      </div>
    </UIAlert>
  )
}