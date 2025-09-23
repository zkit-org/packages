import { type RefObject, useCallback, useEffect, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

export const useSize = (ref: RefObject<HTMLElement | null>) => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const resize = useCallback(() => {
    setSize({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
    });
  }, [ref]);

  useEffect(() => {
    const ro = new ResizeObserver(resize);
    if (ref.current) {
      ro.observe(ref.current);
    }
    return () => {
      ro.disconnect();
    };
  }, [ref, resize]);

  return size;
};
