import {useEffect, useState, RefObject} from "react";

export interface Size {
    width: number;
    height: number;
}

export const useSize = (ref: RefObject<HTMLElement|null>) => {
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    const resize = () => {
        setSize({
            width: ref.current?.offsetWidth || 0,
            height: ref.current?.offsetHeight || 0
        });
    }

    useEffect(() => {
        const ro = new ResizeObserver( entries => {
            for (let entry of entries) {
                const cr = entry.contentRect;
                resize();
            }
        });
        // 观察一个或多个元素
        ref.current && ro.observe(ref.current);
        return () => {
            ro.disconnect();
        }
    }, []);

    return size;
}
