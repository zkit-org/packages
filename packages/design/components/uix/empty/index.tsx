import {FC, ReactNode} from "react";
import {IconEmpty} from "@arco-iconbox/react-atom-ui";

export type EmptyProps = {
    text?: ReactNode;
    icon?: ReactNode;
}

export const Empty: FC<EmptyProps> = (props) => {
    return <div className={"flex justify-center items-center flex-col p-4"}>
        <div>
            { props.icon || <IconEmpty className={"text-6xl text-muted-foreground opacity-60"} /> }
        </div>
        <div className={"text-xs"}>{props.text || "{#暂无数据#}"}</div>
    </div>
}
