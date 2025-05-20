import { Alert as UIAlert, AlertDescription as UIAlertDescription, AlertTitle as UIAlertTitle } from "../../ui/alert";

export type AlertProps = React.ComponentProps<typeof UIAlert> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
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
    ...rest
  } = props;

  const children = childrenProp || description;

  return <UIAlert {...rest}>
    { icon }
    {title && <UIAlertTitle className={titleClassName}>{title}</UIAlertTitle>}
    {children && <UIAlertDescription className={descriptionClassName}>{children}</UIAlertDescription>}
  </UIAlert>;
}