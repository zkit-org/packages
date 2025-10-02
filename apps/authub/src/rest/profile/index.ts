import type { Profile } from "@/types/account";
import { get, put, resultWrapper } from "@/utils/rest";

export const profile = (username: string) =>
  resultWrapper<Profile>(get<Profile, undefined>(`@main/account/profile/${username}`));

export type UpdateAvatarData = {
  url: string;
};
export const updateAvatar = (data: UpdateAvatarData) =>
  resultWrapper<unknown>(put<unknown, UpdateAvatarData>("@main/account/profile/avatar", data));

export type UpdateReadmeData = {
  content: string;
};

export const updateReadme = (data: UpdateReadmeData) =>
  resultWrapper<unknown>(put<unknown, UpdateReadmeData>("@main/account/readme/update", data));
