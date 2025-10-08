import type { FC, ReactNode } from "react";

import { Card } from "@easykit/design";

export type CountCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
};

export const CountCard: FC<CountCardProps> = (props) => {
  const { title, value, icon } = props;
  return (
    <Card contentClassName="flex items-center justify-center gap-md">
      <div>{icon}</div>
      <div className="flex-1 text-right">
        <div className="font-bold text-2xl">{value}</div>
        <div className="text-muted-foreground text-sm">{title}</div>
      </div>
    </Card>
  );
};
