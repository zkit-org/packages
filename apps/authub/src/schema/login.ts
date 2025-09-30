import { useTranslation } from "react-i18next";
import { object, string, type z } from "zod";

export const useSchema = () => {
  const { t } = useTranslation();
  return object({
    username: string(),
    password: string(),
  });
};

export type LoginFormData = z.infer<ReturnType<typeof useSchema>>;
