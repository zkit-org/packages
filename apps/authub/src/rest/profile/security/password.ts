import type { PasswordFormData } from "@/schema/profile/security/password";
import { post } from "@/utils/rest";

export const change = (data: PasswordFormData) =>
  post<unknown, PasswordFormData>("@main/account/password/change", data);
