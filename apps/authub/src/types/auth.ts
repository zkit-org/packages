import type { LoginFormData } from "@/schema/login";

export interface Token {
  token: string;
  expiresIn: number;
}

export type LoginRestData = {
  code?: string;
} & LoginFormData;
