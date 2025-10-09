import { object, string, type z } from "zod";

export const useSchema = () => {
  return object({
    username: string(),
    password: string(),
  });
};

export type LoginFormData = z.infer<ReturnType<typeof useSchema>>;
