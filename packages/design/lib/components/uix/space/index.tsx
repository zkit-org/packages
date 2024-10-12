import { PropsWithChildren, FC } from "react";
import {cn} from "@easykit/design/lib";

export interface SpaceProps extends PropsWithChildren {
    className?: string;
    direction?: "horizontal" | "vertical";
}

export const Space: FC<SpaceProps> = (props) => {
    const {
        direction = "horizontal",
        className,
    } = props;
    return <div className={cn(
        "flex justify-start items-start",
        direction === "vertical" ? "flex-col space-y-2" : null,
        direction === "horizontal" ? "flex-row space-x-2 items-start" : null,
        className,
    )}>
        { props.children }
    </div>
};
