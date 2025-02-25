import {FC, forwardRef, PropsWithChildren} from "react";
import * as BUILT_IN from '@easykit/design/lib/formatters';

export type Formatters = ([string, any[]] | string)[];
export type FunctionMap = Record<string, Function>;

const _handles: FunctionMap = {};

export const register = (handles: FunctionMap) => {
  Object.assign(_handles, handles);
}

export const formatValue = (v: any, formatters: string[], all?: FunctionMap) => {
  const merged: any = {...BUILT_IN, ..._handles, ...(all ?? {})};
  const fallback = ((v: any, ...p: any[]) => (v));
  let params: any[] = [];

  formatters.forEach((filter: any) => {
    let call = fallback;
    if (typeof filter === 'string') {
      call = merged[filter] || fallback;
    } else if (typeof filter === 'function') {
      call = filter;
    } else if (typeof filter === 'object' && filter.length) {
      call = merged[filter[0]] || fallback;
      params = filter[1];
    }
    try {
      v = call(v, ...params);
    } catch (e) {
      console.log('formatter error', filter);
    }
  });
  return v;
}

export interface ValueFormatterProps extends PropsWithChildren {
  value?: any;
  formatters?: any[];
  handles?: FunctionMap;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,react/display-name
export const ValueFormatter: FC<ValueFormatterProps> = forwardRef((props, ref) => {
  const {
    handles,
    formatters = [],
    value,
    children
  } = props;
  let v = value === 0 ? value : (value || children);
  if (!formatters.includes("defaultValue")) formatters.push('defaultValue');
  v = formatValue(v, formatters, handles);
  return <>{v}</>
})
