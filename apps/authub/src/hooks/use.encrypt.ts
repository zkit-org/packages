import { useCommonConfig } from "@/hooks";
import { encrypt } from "@/utils/crypto";

export const useEncrypt = () => {
  const config = useCommonConfig();
  if (!config?.publicKey) {
    return (text: string) => text;
  }
  return (text: string) => encrypt(text, config.publicKey);
};
