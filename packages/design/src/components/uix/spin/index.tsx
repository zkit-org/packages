import type { FC } from "react";

import { Spin as IconSpin } from "@easykit/design/components/icons";
import { cn } from "@easykit/design/lib";

export type SpinProps = {
  className?: string;
};

export const Spin: FC<SpinProps> = (props) => {
  return <IconSpin className={cn("animate-spin", props.className)} />;
};
