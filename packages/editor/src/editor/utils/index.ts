import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// biome-ignore lint/suspicious/noExplicitAny: <randomElement>
export function randomElement(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export { cssVar } from "./cssVar";
export { getRenderContainer } from "./getRenderContainer";
export { isCustomNodeSelected } from "./isCustomNodeSelected";
export { isTextSelected } from "./isTextSelected";
