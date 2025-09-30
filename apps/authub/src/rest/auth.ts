import type { LoginFormData } from "@/schema/login";
import type { Profile } from "@/types/account";
import type { Token } from "@/types/auth";
import { get, post, resultWrapper } from "@/utils/rest";

export type LoginRestData = {
  code?: string;
} & LoginFormData;

export const login = (data: LoginRestData) =>
  resultWrapper<Token>(post<Token, LoginRestData>("@main/account/login", data));

export const profile = () => get<Profile, null>("@main/account/profile", null);

export const logout = () => post("@main/account/logout");
