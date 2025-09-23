import type { FC } from "react";
import { IconSpin } from "@arco-iconbox/react-atom-ui";

import { cn } from "@easykit/design/lib";

export type SpinProps = {
  className?: string;
};

export const Spin: FC<SpinProps> = (props) => {
  return <IconSpin className={cn("animate-spin", props.className)} />;
};
