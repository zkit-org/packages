import { get } from "@/utils/headers.server";
// Rest 配置
import { alias } from "@/utils/rest";

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
