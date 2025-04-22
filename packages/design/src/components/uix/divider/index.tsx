import {PropsWithChildren} from 'react';

export interface DividerProps extends PropsWithChildren {
  orientation: 'left' | 'center' | 'right';
}

export const Divider = (props: DividerProps) => {
  return <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t"/>
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-background px-2 text-muted-foreground">
        {props.children}
      </span>
    </div>
  </div>
};
