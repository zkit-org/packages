import type { AddAppFormData } from "@/schema/app";
import type { AppListResponse } from "@/types/app";
import type { PageData, PageRequest } from "@/types/rest";
import { get, post, resultWrapper } from "@/utils/rest";

export const add = (data: AddAppFormData) => resultWrapper<void>(post<void, AddAppFormData>("@main/app/add", data));

export type ListResult = PageData<AppListResponse>;

export const list = (data: PageRequest) =>
  resultWrapper<ListResult>(get<ListResult, PageRequest>("@main/app/list", data));
