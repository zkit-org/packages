import type { AddAppFormData } from "@/schema/app";
import type { AppListResponse, AppResponse } from "@/types/app";
import type { PageData, PageRequest } from "@/types/rest";
import { del, get, post, put } from "@/utils/rest";

export const add = (data: AddAppFormData) => post<void, AddAppFormData>("@main/app/add", data);

export type ListResult = PageData<AppListResponse>;

export const list = (data: PageRequest) => get<ListResult, PageRequest>("@main/app/list", data);

export const enable = (id: number) => put<void, number>(`@main/app/${id}/enable`);

export const disable = (id: number) => put<void, number>(`@main/app/${id}/disable`);

export const deleteApp = (id: number) => del<void, number>(`@main/app/${id}`);

export const detail = (id: number) => get<AppResponse, number>(`@main/app/${id}`);
