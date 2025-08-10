import { createContext, type FC, type PropsWithChildren } from 'react'
import omit from 'lodash/omit'
import zhCN from '@easykit/design/assets/locales/zh-cn'
import { Toaster } from '@easykit/design/components/ui/sonner'

export interface UIXContextProps {
  locale?: typeof zhCN
  toasterPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

const defaultContextProps: UIXContextProps = {
  locale: zhCN,
}

export const UIXContext = createContext<UIXContextProps>(defaultContextProps)

export type ConfigProviderProps = PropsWithChildren<UIXContextProps>

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  const config: UIXContextProps = {
    ...omit(props, ['children']),
  }
  const { toasterPosition = 'top-center' } = config
  return (
    <>
      <UIXContext.Provider value={config}>{props.children}</UIXContext.Provider>
      <Toaster position={toasterPosition} />
    </>
  )
}
