import { type FC, forwardRef, type PropsWithChildren } from 'react'
import * as BUILT_IN from '@easykit/design/lib/formatters'

// biome-ignore lint/suspicious/noExplicitAny: <formatters>
export type Formatters = ([string, any[]] | string)[]
// biome-ignore lint/suspicious/noExplicitAny: <functionMap>
export type FunctionMap = Record<string, (value: any, ...args: any[]) => any>

const _handles: FunctionMap = {}

export const register = (handles: FunctionMap) => {
  Object.assign(_handles, handles)
}

// biome-ignore lint/suspicious/noExplicitAny: <v>
export const formatValue = (v: any, formatters: Formatters, all?: FunctionMap) => {
  // biome-ignore lint/suspicious/noExplicitAny: <merged>
  const merged: any = { ...BUILT_IN, ..._handles, ...(all ?? {}) }
  // biome-ignore lint/suspicious/noExplicitAny: <fallback>
  const fallback = (v: any, ..._p: any[]) => v
  // biome-ignore lint/suspicious/noExplicitAny: <params>
  let params: any[] = []
  let result = v

  for (const filter of formatters) {
    let call = fallback
    if (typeof filter === 'string') {
      call = merged[filter] || fallback
    } else if (typeof filter === 'function') {
      call = filter
    } else if (typeof filter === 'object' && filter.length) {
      call = merged[filter[0]] || fallback
      params = filter[1]
    }
    try {
      result = call(result, ...params)
    } catch {
      console.log('formatter error', filter)
    }
  }
  return result
}

export interface ValueFormatterProps extends PropsWithChildren {
  // biome-ignore lint/suspicious/noExplicitAny: <value>
  value?: any
  // biome-ignore lint/suspicious/noExplicitAny: <formatters>
  formatters?: any[]
  handles?: FunctionMap
}

export const ValueFormatter: FC<ValueFormatterProps> = forwardRef((props, _ref) => {
  const { handles, formatters = [], value, children } = props
  let v = value === 0 ? value : value || children
  if (!formatters.includes('defaultValue')) formatters.push('defaultValue')
  v = formatValue(v, formatters, handles)
  return <>{v}</>
})
