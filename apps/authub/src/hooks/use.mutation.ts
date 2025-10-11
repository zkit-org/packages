import { type UseMutationOptions, useMutation as useMutationTanstack } from "@tanstack/react-query";

import { useMessage } from "@easykit/design";
import type { RestResult } from "@/types/rest";
import { RestError } from "@/utils/rest";

type RestMutationOptions<TData = unknown, TError = Error, TVariables = void, TContext = unknown> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationFn"
> & {
  mutationFn: (variables: TVariables) => Promise<RestResult<TData>>;
  showError?: boolean;
};

export const useMutation = <TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  options: RestMutationOptions<TData, TError, TVariables, TContext>,
) => {
  const msg = useMessage();
  const showError = options.showError ?? true;

  return useMutationTanstack({
    onError: (error) => {
      if (showError) {
        if (error instanceof RestError) {
          msg.error(error.message);
        } else {
          msg.error(error instanceof Error ? error.message : "Unknown error");
        }
      }
    },
    ...options,
    mutationFn: async (variables) => {
      const result = await options.mutationFn(variables);
      if (!result.success) {
        throw new RestError(result.message, result.code, result.data);
      }
      return result.data as TData;
    },
  });
};
