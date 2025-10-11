import type { RegisterFormData } from "@/schema/register";
import { post } from "@/utils/rest";
import type { Token } from "@/utils/token";

export const sendEmailCode = (data: { email: string }) =>
  post<void, { email: string }>("@main/account/register/email/send", data);

export const register = (data: RegisterFormData) => post<Token, RegisterFormData>("@main/account/register", data);
