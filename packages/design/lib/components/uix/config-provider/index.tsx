import {createContext, FC, PropsWithChildren, useEffect} from "react";
import omit from "lodash/omit";
import {Toaster} from "@easykit/design/components/ui/toaster";
import zhCN from "@easykit/design/locales/zh-CN";

export interface UIXContextProps {
    locale?: any;
    onLocaleChange?: (key: string) => void,
}

const defaultContextProps: UIXContextProps = {
    locale: zhCN,
};

export const UIXContext = createContext<UIXContextProps>(defaultContextProps);

export interface ConfigProviderProps extends PropsWithChildren<UIXContextProps>{}

export const ConfigProvider:FC<ConfigProviderProps> = (props) => {
    const config: UIXContextProps = {
        ...omit(props, ['children']),
    };
    useEffect(() => {
        config.onLocaleChange && config.onLocaleChange(config.locale.key);
    }, [config.locale]);
    return <>
        <UIXContext.Provider value={config}>{props.children}</UIXContext.Provider>
        <Toaster />
    </>;
}
