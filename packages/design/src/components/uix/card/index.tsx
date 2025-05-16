import {
  Card as UICard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {PropsWithChildren, FC, ReactNode} from "react";
import {cn} from "@easykit/design/lib";
import classNames from "classnames";

export interface CardProps extends PropsWithChildren {
  footer?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  onClick?: () => void;
  shadow?: boolean;
}

export const Card: FC<CardProps> = (props) => {
  const {
    title = '',
    description = '',
    className,
    contentClassName,
    footer,
    shadow = false,
  } = props;

  return <UICard
    onClick={props.onClick}
    className={classNames(!shadow ? "shadow-none" : null, className)}
  >
    {
      title || description ? <CardHeader className={"pb-0"}>
        {title ? <CardTitle>{title}</CardTitle> : null}
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader> : null
    }
    <CardContent
      className={cn(
        "px-6",
        contentClassName,
      )}
    >
      {props.children}
    </CardContent>
    {footer ? <CardFooter>{footer}</CardFooter> : null}
  </UICard>
}
