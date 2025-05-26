import {cn} from "@easykit/design/lib";
import type { FC, PropsWithChildren } from 'react'

export interface SpaceProps extends PropsWithChildren {
  className?: string;
  direction?: "horizontal" | "vertical";
}

export const Space: FC<SpaceProps> = (props) => {
  const { direction = 'horizontal', className } = props
  return (
    <div
      className={cn(
        'flex items-start justify-start',
        direction === 'vertical' ? 'flex-col space-y-2' : null,
        direction === 'horizontal' ? 'flex-row items-start space-x-2' : null,
        className
      )}
    >
      {props.children}
    </div>
  )
};
