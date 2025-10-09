import type { AddAppFormData } from "@/schema/app";
import { post, resultWrapper } from "@/utils/rest";

export const add = (data: AddAppFormData) => resultWrapper<void>(post<void, AddAppFormData>("@main/app/add", data));
