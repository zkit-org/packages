import {FC, ReactNode, useContext} from "react";
import {IconEmpty} from "@arco-iconbox/react-atom-ui";
import {UIXContext} from "@easykit/design/components/uix/config-provider";
import get from "lodash/get";

export type EmptyProps = {
  text?: ReactNode;
  icon?: ReactNode;
}

export const Empty: FC<EmptyProps> = (props) => {
  const config = useContext(UIXContext);
  const text = props.text || get(config.locale, "Empty.text");

  return <div className={"flex justify-center items-center flex-col p-4"}>
    <div>
      {props.icon || <IconEmpty className={"text-6xl text-muted-foreground opacity-60"}/>}
    </div>
    <div className={"text-xs text-secondary"}>{text}</div>
  </div>
}
