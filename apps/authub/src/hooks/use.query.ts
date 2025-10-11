import {
  type DefinedInitialDataOptions,
  type QueryKey,
  type UndefinedInitialDataOptions,
  type UseQueryOptions,
  useQuery as useQueryTanstack,
} from "@tanstack/react-query";

import { useMessage } from "@easykit/design";
import type { RestResult } from "@/types/rest";
import { RestError } from "@/utils/rest";

type RestQueryOptions<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryFn"
> & {
  queryFn: (context: {
    queryKey: TQueryKey;
    signal: AbortSignal;
    meta: Record<string, unknown> | undefined;
  }) => Promise<RestResult<TData>>;
  showError?: boolean;
};

export const useQuery = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: RestQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
  const msg = useMessage();

  return useQueryTanstack({
    ...options,
    queryFn: async (context) => {
      const result = await options.queryFn(context);
      if (!result.success) {
        const error = new RestError(result.message, result.code, result.data);
        if (options.showError) {
          msg.error(error.message);
        }
        throw error;
      }
      return result.data as TQueryFnData;
    },
  });
};
