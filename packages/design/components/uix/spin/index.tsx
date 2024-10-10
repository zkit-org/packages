import { FC } from "react";
import { cn } from "@/lib/utils";
import { IconSpin } from "@arco-iconbox/react-atom-ui";

export type SpinProps = {
    className?: string;
};

export const Spin: FC<SpinProps> = (props) => {
    return <IconSpin className={cn("animate-spin", props.className)} />;
}
