import { isServer, QueryClient, type QueryKey } from "@tanstack/react-query";

import type { RestResult } from "@/types/rest";
import { RestError } from "@/utils/rest";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 5 * 1000, // 改为 5 秒，让缓存更快过期
        retry: false, // isServer ? false : 3, // 服务端重试3次，客户端不重试
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

type RestPrefetchOptions<TQueryFnData = unknown, TQueryKey extends QueryKey = QueryKey> = {
  queryKey: TQueryKey;
  queryFn: (context: {
    queryKey: TQueryKey;
    signal: AbortSignal;
    meta: Record<string, unknown> | undefined;
  }) => Promise<RestResult<TQueryFnData>>;
};

/**
 * 包装后的 prefetchQuery 工具方法
 * 与自定义 useQuery hook 保持一致的数据处理逻辑
 */
export const prefetchQuery = async <TQueryFnData = unknown, TQueryKey extends QueryKey = QueryKey>(
  options: RestPrefetchOptions<TQueryFnData, TQueryKey>,
) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: options.queryKey,
    queryFn: async (context) => {
      const result = await options.queryFn(context);
      if (!result.success) {
        const error = new RestError(result.message, result.code, result.data);
        throw error;
      }
      // 返回解包后的数据，与 useQuery 保持一致
      return result.data as TQueryFnData;
    },
  });

  return queryClient;
};
