import {useToast} from "@easykit/design/components/ui/use-toast"
import {useMemo} from "react";

export const useMessage = () => {
  const {toast} = useToast();
  return useMemo(() => {
    return {
      success: (message?: string) => {
        toast({
          description: message,
        })
      },
      error: (message?: string) => {
        toast({
          variant: "destructive",
          description: message,
        })
      }
    }
  }, [toast])
};
