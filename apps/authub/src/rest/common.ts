import { post } from "@/utils/rest";

export type SendEmailCodeData = {
  action: string;
  email: string;
};

export const sendEmailCode = (data: SendEmailCodeData) =>
  post<unknown, SendEmailCodeData>("@main/account/email/code/send", data);
