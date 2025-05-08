import {toast} from "sonner"
import {useMemo} from "react";

export const useMessage = () => {
  return useMemo(() => {
    return {
      success: (message?: string) => {
        toast.success(message)
      },
      error: (message?: string) => {
        toast.error(message)
      },
      warning: (message?: string) => {
        toast.warning(message)
      },
      info: (message?: string) => {
        toast.info(message)
      }
    }
  }, [])
};
