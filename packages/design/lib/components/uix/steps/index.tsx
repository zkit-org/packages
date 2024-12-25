import { FC, PropsWithChildren, Children, cloneElement, ReactElement } from "react";
import { cn } from "@easykit/design/lib";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

export interface StepsProps extends PropsWithChildren {
    current?: number;
    className?: string;
}

export interface StepsItemProps extends PropsWithChildren {
    title: string;
    description?: string;
    className?: string;
    status?: 'wait' | 'process' | 'finish' | 'error';
    index?: number;
    last?: boolean;
}

export const StepsItem: FC<StepsItemProps> = (props) => {
    const {
        index,
        status,
        last,
        description,
    } = props;
    return <div className={cn(
        'flex',
        !last ? 'flex-1' : null
    )}>
        <div className={cn(
            'w-8 h-8 flex justify-center items-center rounded-full mr-2',
            status === 'wait' ? 'bg-secondary text-secondary-foreground' : null,
            status === 'process' ? 'bg-primary text-primary-foreground' : null,
            status === 'finish' ? 'bg-success text-success-foreground' : null,
        )}>
            { status === 'finish' ? <CheckIcon /> : null }
            { status === 'error' ? <Cross2Icon /> : null }
            { ['wait', 'process'].includes(status!) ? index! + 1 : null }
        </div>
        <div>
            <div className={"leading-8"}>{ props.title }</div>
            { description ? <div>{ description }</div> : null }
        </div>
        {
            !last ? <div className={"flex-1 h-8 flex justify-center items-center mx-2"}>
                <div className={cn(
                    "h-px w-full bg-secondary",
                    status === "finish" ? "bg-primary" : null,
                )}></div>
            </div> : null
        }
    </div>
};

export const Steps: FC<StepsProps> = (props) => {
    const { current } = props;
    const size = Children.count(props.children);
    return <div className={cn("flex", props.className)}>
        {
            Children.map(props.children, (child, index) => {
                const c = child as ReactElement;
                return cloneElement<any>(c, {
                    ...(c as any).props,
                    index,
                    last: index === size - 1,
                    status: index < current! ? 'finish' : index === current ? 'process' : 'wait',
                });
            })
        }
    </div>
};
