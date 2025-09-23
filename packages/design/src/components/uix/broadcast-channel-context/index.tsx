import { createContext, type FC, type PropsWithChildren, useContext, useEffect, useState } from "react";

export const BroadcastChannelContext = createContext<BroadcastChannel | null>(null);

export type BroadcastChannelProviderProps = PropsWithChildren<{
  channelName: string;
  onMessage: ((this: BroadcastChannel, ev: MessageEvent) => unknown) | null;
}>;

export const BroadcastChannelProvider: FC<BroadcastChannelProviderProps> = (props) => {
  const { channelName, onMessage } = props;
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") {
      return;
    }
    const channel = new BroadcastChannel(channelName);
    channel.onmessage = onMessage;
    setChannel(channel);
  }, [channelName, onMessage]);

  return <BroadcastChannelContext.Provider value={channel}>{props.children}</BroadcastChannelContext.Provider>;
};

export const useBroadcastChannel = () => {
  return useContext(BroadcastChannelContext);
};
