import {createContext, FC, PropsWithChildren} from "react";
import omit from "lodash/omit";
import {Toaster} from "@easykit/design/components/ui/sonner";
import zhCN from "@easykit/design/assets/locales/zh-CN";

export interface UIXContextProps {
  locale?: any;
}

const defaultContextProps: UIXContextProps = {
  locale: zhCN,
};

export const UIXContext = createContext<UIXContextProps>(defaultContextProps);

export type ConfigProviderProps = PropsWithChildren<UIXContextProps>

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  const config: UIXContextProps = {
    ...omit(props, ['children']),
  };
  return <>
    <UIXContext.Provider value={config}>{props.children}</UIXContext.Provider>
    <Toaster/>
  </>;
}
