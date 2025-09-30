import { st } from "@/utils/locale.server";

export const title = async (title: string) => {
  const titles = [await st("Authub")];
  if (title) {
    titles.unshift(title);
  }
  return titles.join(" - ");
};

export const keywords = async (keyword?: string | string[]) => {
  const list = [await st("Authub")];
  if (typeof keyword === "string") {
    list.push(keyword);
  } else if (Array.isArray(keyword)) {
    list.push(...keyword);
  }
  return list.join(", ");
};
