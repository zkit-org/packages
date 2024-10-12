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

export interface CardProps extends PropsWithChildren{
    footer?: ReactNode;
    title?: string;
    description?: string;
    className?: string;
    contentClassName?: string;
    onClick?: () => void;
}

export const Card: FC<CardProps> = (props) => {
    const {
        title = '',
        description = '',
        className,
        contentClassName,
        footer
    } = props;

    return <UICard
        onClick={props.onClick}
        className={className}
    >
        {
            title || description ? <CardHeader className={"pb-0"}>
                { title ? <CardTitle>{ title }</CardTitle> : null }
                { description ? <CardDescription>{ description }</CardDescription> : null }
            </CardHeader> : null
        }
        <CardContent
            className={cn(
                "p-6",
                contentClassName,
            )}
        >
            { props.children }
        </CardContent>
        { footer ? <CardFooter>{ footer }</CardFooter> : null }
    </UICard>
}
