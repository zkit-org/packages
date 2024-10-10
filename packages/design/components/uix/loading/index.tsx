import {FC, PropsWithChildren} from "react";
import {Spin} from "@/components/uix/spin";
import {cn} from "@/lib/utils";

export interface LoadingProps extends PropsWithChildren {
    loading?: boolean;
    className?: string;
}

export const Loading: FC<LoadingProps> = (props) => {
    const {
        loading
    } = props;

    return <div className={cn(
        "relative",
        props.className
    )}>
        { props.children }
        { loading ? <div className={"absolute top-0 left-0 bottom-0 right-0 bg-white/50 flex justify-center items-center"}><Spin /></div> : null }
    </div>
}
