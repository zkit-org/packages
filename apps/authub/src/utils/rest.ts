import type { AxiosRequestConfig } from "axios";
import Axios, { type AxiosHeaders, type AxiosResponse } from "axios";

import type { RestConfig, RestResult } from "@/types/rest";

let _config: RestConfig = {};
const instance = Axios.create({
  timeout: 30000,
  headers: {
    post: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  },
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
});
// biome-ignore lint/suspicious/noExplicitAny: aliasMap
let aliasMap: Record<string, any> = {};

instance.interceptors.response.use((response) => {
  const { config } = response;
  if (config && config.responseType === "blob" && response.data.type !== "application/json") {
    const file = new Blob([response.data], { type: response.headers["content-type"] || "application/vnd.ms-excel" });
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    // biome-ignore lint/suspicious/noExplicitAny: config
    a.download = (config as any).fileName;
    a.click();
  }
  return response;
});

// biome-ignore lint/suspicious/noExplicitAny: data
const handleResponse = (data: RestResult<any>, response: AxiosResponse) => {
  const { onResponse } = _config;
  if (typeof onResponse === "function") {
    onResponse(data, response);
  }
  return data;
};

const handleUrl = (url?: string) => {
  if (!url) return url;
  let result = url;
  for (const key of Object.keys(aliasMap)) {
    const config = aliasMap[key];
    result = result?.replace(key, config.url);
  }
  return result;
};

const handleHeaders = async (url: string, headers?: AxiosHeaders) => {
  const result = {
    ...(headers || {}),
    timezone: -(new Date().getTimezoneOffset() / 60),
  };
  const aliasHeaders = {};
  for (const key of Object.keys(aliasMap)) {
    if (url.startsWith(key)) {
      const config = aliasMap[key];
      const { headers } = config;
      if (typeof headers === "function") {
        Object.assign(aliasHeaders, (await headers()) || {});
      } else {
        Object.assign(aliasHeaders, headers || {});
      }
      return Object.assign(aliasHeaders, result);
    }
  }
  return result;
};

export function request<T>(config: AxiosRequestConfig): Promise<RestResult<T>> {
  const { url, headers, ...rest } = config;
  return new Promise<RestResult<T>>((resolve) => {
    handleHeaders(url as string, headers as AxiosHeaders).then((headers) => {
      const _url = handleUrl(url) || "";
      if (_url.startsWith("@")) {
        // 没有处理别名的不请求
        resolve({
          code: 500,
          message: "Network Error",
        });
        return;
      }
      instance
        .request<RestResult<T>>({
          ...rest,
          url: _url,
          headers,
        })
        .then((response) => {
          resolve(handleResponse(response.data, response));
        })
        .catch((error) => {
          resolve({
            code: 500,
            message: "Network Error",
            data: error,
          });
        });
    });
  });
}

export function get<T, P = undefined>(url: string, params?: P, config?: AxiosRequestConfig): Promise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: "get",
    params,
  });
}

export function post<T, D = undefined>(url: string, data?: D, config?: AxiosRequestConfig): Promise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: "post",
    data,
  });
}

export function put<T, D = undefined>(url: string, data?: D, config?: AxiosRequestConfig): Promise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: "put",
    data,
  });
}

export function del<T, D = undefined>(url: string, data?: D, config?: AxiosRequestConfig): Promise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: "delete",
    data,
  });
}

export function download<T, P = undefined>(
  url: string,
  params?: P,
  config?: AxiosRequestConfig,
): Promise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: "get",
    params,
    responseType: "blob",
    timeout: 0,
  });
}

// biome-ignore lint/suspicious/noExplicitAny: map
export const alias = (map: Record<string, any>) => {
  aliasMap = {
    ...aliasMap,
    ...map,
  };
};

export const config = (config: RestConfig) => {
  _config = config;
};

export class RestError extends Error {
  code?: number;
  data?: unknown;
  constructor(message?: string, code?: number, data?: unknown) {
    super(message);
    this.name = "RestError";
    this.code = code;
    this.data = data;
  }
}
