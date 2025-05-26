import {cn} from "@easykit/design/lib";
import {CheckIcon, Cross2Icon} from "@radix-ui/react-icons";
import { Children, type FC, type PropsWithChildren, type ReactElement, cloneElement } from 'react'

export interface StepsProps extends PropsWithChildren {
  current?: number
  className?: string
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
  return (
    <div className={cn('flex', last ? null : 'flex-1')}>
      <div
        className={cn(
          'mr-2 flex h-8 w-8 items-center justify-center rounded-full',
          status === 'wait' ? 'bg-secondary text-secondary-foreground' : null,
          status === 'process' ? 'bg-primary text-primary-foreground' : null,
          status === 'finish' ? 'bg-success text-success-foreground' : null
        )}
      >
        {status === 'finish' ? <CheckIcon /> : null}
        {status === 'error' ? <Cross2Icon /> : null}
        {['wait', 'process'].includes(status!) ? index! + 1 : null}
      </div>
      <div>
        <div className="leading-8">{props.title}</div>
        {description ? <div>{description}</div> : null}
      </div>
      {last ? null : (
        <div className="mx-2 flex h-8 flex-1 items-center justify-center">
          <div className={cn('h-px w-full bg-secondary', status === 'finish' ? 'bg-primary' : null)} />
        </div>
      )}
    </div>
  )
};

export const Steps: FC<StepsProps> = (props) => {
  const {current} = props;
  const size = Children.count(props.children);
  return <div className={cn("flex", props.className)}>
    {
      Children.map(props.children, (child, index) => {
        const c = child as ReactElement;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        return cloneElement<any>(c, {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          ...(c as any).props,
          index,
          last: index === size - 1,
          status: index < current! ? 'finish' : index === current ? 'process' : 'wait',
        })
      })
    }
  </div>
};
