import {ChevronDownIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import {FC} from "react";
import classNames from "classnames";

export type ExpandActionProps = {
    enable: boolean;
    expanded: boolean;
    onClick?: () => void;
}

export const ExpandAction: FC<ExpandActionProps> = (props) => {
    const { enable, expanded, onClick } = props;
    return <div
        onClick={onClick}
        className={classNames(
            "w-6 h-6 rounded-sm flex justify-center items-center ",
            enable ? "bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)] cursor-pointer" : ""
        )}
    >
        { enable ? (expanded ? <ChevronDownIcon /> : <ChevronRightIcon />) : null }
    </div>
}
