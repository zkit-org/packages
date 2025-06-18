import { type ReactNode, useMemo } from 'react'
import { type ExternalToast, toast } from 'sonner'

export const useMessage = () => {
  return useMemo(() => {
    return {
      success: (message?: ReactNode, options?: ExternalToast) => {
        toast.success(message, options)
      },
      error: (message?: ReactNode, options?: ExternalToast) => {
        toast.error(message, options)
      },
      warning: (message?: ReactNode, options?: ExternalToast) => {
        toast.warning(message, options)
      },
      info: (message?: ReactNode, options?: ExternalToast) => {
        toast.info(message, options)
      },
    }
  }, [])
}
