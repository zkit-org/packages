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
  return <Avatar alt="cover" className={className} src={account?.avatar ?? "/assets/image/avatar.jpeg"} />;
};

export const AccountInfo = () => {
  const account = useAtomValue(profileState);
  return (
    <div className="flex w-full items-center justify-start gap-3 p-2">
      <AccountAvatar className="size-10" />
      <div className="flex-1 break-all">
        <div className="text-md">{account?.username}</div>
        <div className="text-secondary-foreground/50 text-sm">{account?.email}</div>
      </div>
    </div>
  );
};
