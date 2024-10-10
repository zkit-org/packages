import * as React from 'react';
import {
    Avatar as UIAvatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useMemo } from "react";

export interface AvatarProps extends React.PropsWithChildren {
    src: string;
    fallback?: string;
    alt?: string;
    className?: string;
    fallbackClassName?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
    const { fallback } = props;
    const fall = useMemo(() => {
        return fallback?.charAt(0).toUpperCase();
    } , [fallback])
    return <UIAvatar className={props.className}>
        <AvatarImage src={props.src} alt={props.alt} />
        <AvatarFallback className={props.fallbackClassName}>{fall}</AvatarFallback>
    </UIAvatar>
}
