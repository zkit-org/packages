import type { RegisterFormData } from "@/schema/register";
import { post, resultWrapper } from "@/utils/rest";
import type { Token } from "@/utils/token";

export const sendEmailCode = (data: { email: string }) =>
  resultWrapper<void>(post<void, { email: string }>("@main/account/register/email/send", data));

export const register = (data: RegisterFormData) =>
  resultWrapper<Token>(post<Token, RegisterFormData>("@main/account/register", data));
