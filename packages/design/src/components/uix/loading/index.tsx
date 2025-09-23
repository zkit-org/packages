import type { FC, PropsWithChildren } from "react";

import { Spin } from "@easykit/design/components/uix/spin";
import { cn } from "@easykit/design/lib";

export interface LoadingProps extends PropsWithChildren {
  loading?: boolean;
  className?: string;
}

export const Loading: FC<LoadingProps> = (props) => {
  const { loading } = props;

  return (
    <div className={cn("relative", props.className)}>
      {props.children}
      {loading ? (
        <div className="dark:!bg-black/5 absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-white/50">
          <Spin />
        </div>
      ) : null}
    </div>
  );
};
