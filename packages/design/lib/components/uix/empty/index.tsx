import {FC, ReactNode, useContext} from "react";
import {IconEmpty} from "@arco-iconbox/react-atom-ui";
import {UIXContext} from "@easykit/design/components/uix/config-provider";
import get from "lodash/get";
import classNames from "classnames";

export type EmptyProps = {
  text?: ReactNode;
  icon?: ReactNode;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

export const Empty: FC<EmptyProps> = (props) => {
  const {
    className,
    iconClassName,
    textClassName,
  } = props;
  const config = useContext(UIXContext);
  const text = props.text || get(config.locale, "Empty.text");

  return <div className={classNames("flex justify-center items-center flex-col p-4", className)}>
    <div className={iconClassName}>
      {props.icon || <IconEmpty className={"text-6xl text-muted-foreground opacity-60"}/>}
    </div>
    <div className={classNames("text-xs text-secondary-foreground/70", textClassName)}>{text}</div>
  </div>
}
