import { useLayoutEffect } from "react";
import { useSetAtom } from "jotai";

import { layoutConfigState } from "@/state/layout";

export const useLayoutConfig = <T>(config: T) => {
  const setConfig = useSetAtom(layoutConfigState);

  // 使用 useLayoutEffect 在 DOM 更新前同步执行
  // 比 useEffect 更早，在浏览器绘制前完成状态更新，避免闪烁
  useLayoutEffect(() => {
    setConfig(config);
    // 组件卸载时重置配置
    return () => {
      setConfig(null);
    };
  }, [config, setConfig]);
};
