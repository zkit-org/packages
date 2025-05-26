import zhCN from '@easykit/design/assets/locales/zh-CN'
import {Toaster} from "@easykit/design/components/ui/sonner";
import omit from 'lodash/omit'
import { type FC, type PropsWithChildren, createContext } from 'react'

export interface UIXContextProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  locale?: any
}

const defaultContextProps: UIXContextProps = {
  locale: zhCN,
}

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
