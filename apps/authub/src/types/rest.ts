import type { AxiosResponse } from 'axios'

export type RestConfig = {
  // biome-ignore lint/suspicious/noExplicitAny: RestResult
  onResponse?: (data: RestResult<any>, response: AxiosResponse) => void
}

export type RestResult<T> = {
  success?: boolean
  code?: number
  message?: string
  data?: T
}

export type PageData<T> = {
  total: number;
  data: T[];
}

export type PageResult<T> = RestResult<PageData<T>>


