import { get, post } from "@/utils/rest";

export type OtpSecretResult = {
  secret: string;
  qrcode: string;
  username: string;
};

export const otpSecret = () => get<OtpSecretResult>("@main/account/otp/secret");

export type OTPStatus = {
  enable: boolean;
  enableTime: number;
};

export const otpStatus = () => get<OTPStatus>("@main/account/otp/status");

export type OTPBindData = {
  code: string;
  otpCode: string;
};

export const otpBind = (data: OTPBindData) => post<unknown, OTPBindData>("@main/account/otp/bind", data);

export type OTPDisableData = {
  code: string;
};
export const otpDisable = (data: OTPDisableData) => post<unknown, OTPDisableData>("@main/account/otp/disable", data);
