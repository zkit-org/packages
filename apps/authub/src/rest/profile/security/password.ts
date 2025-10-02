import type { PasswordFormData } from "@/schema/profile/security/password";
import { post, resultWrapper } from "@/utils/rest";

export const change = (data: PasswordFormData) =>
  resultWrapper(post<unknown, PasswordFormData>("@main/account/password/change", data));
