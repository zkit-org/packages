import type { AxiosResponse } from "axios";

import bus from "@/events";
import { UNAUTHORIZED } from "@/events/auth";
import type { RestResult } from "@/types/rest";
import { get } from "@/utils/headers.client";
// Rest 配置
import { alias, config } from "@/utils/rest";

config({
  // biome-ignore lint/suspicious/noExplicitAny: onResponse
  onResponse: (data: RestResult<any>, response: AxiosResponse) => {
    const { url } = response.config;
    const { code } = data;
    if (code === 401 && !url?.includes("main/account/profile")) {
      bus.emit(UNAUTHORIZED);
    }
  },
});

// 别名配置
alias({
  "@main": {
    url: "/api/main",
    headers: get,
  },
  "@assets": {
    url: "/api/assets",
    headers: get,
  },
  "@account": {
    url: "/api/account",
    headers: get,
  },
});
