import type { FC } from "react";
import { useAtomValue } from "jotai";

import { Avatar } from "@easykit/design";
import { profileState } from "@/state/public";

export type AccountAvatarProps = {
  className?: string;
};

export const AccountAvatar: FC<AccountAvatarProps> = (props) => {
  const { className } = props;
  const account = useAtomValue(profileState);
  return (
    <Avatar alt="cover" className={className} fallback={(account?.username ?? "U").slice(0, 1)} src={account?.avatar} />
  );
};

export const AccountInfo = () => {
  const account = useAtomValue(profileState);
  return (
    <div className="flex w-full items-start justify-start gap-3 p-2">
      <AccountAvatar className="!w-10 mt-2 h-10" />
      <div className="flex-1 break-all">
        <div className="text-lg">{account?.username}</div>
        <div className="text-secondary-foreground/50 text-sm">{account?.email}</div>
      </div>
    </div>
  );
};
