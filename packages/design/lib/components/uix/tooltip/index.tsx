import {FC, PropsWithChildren, ReactNode} from "react";
import {Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger} from "@easykit/design/components/ui/tooltip";

type Side = "top" | "right" | "bottom" | "left";

export type TooltipProps = PropsWithChildren & {
    content: ReactNode;
    side?: Side;
}

export const Tooltip: FC<TooltipProps> = (props) => {
    return <TooltipProvider>
        <TooltipUI>
            <TooltipTrigger asChild={true}>{props.children}</TooltipTrigger>
            <TooltipContent side={props.side} className={"bg-black/90"}>{props.content}</TooltipContent>
        </TooltipUI>
    </TooltipProvider>;
}
