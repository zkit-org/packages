import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getTheme = async (): Promise<string> => {
  return (await getCookie("theme", { cookies })) || "system";
};
