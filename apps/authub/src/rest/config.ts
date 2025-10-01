import { get } from "@/utils/rest";
import type { CommonConfig } from "../types/config";

export const common = () => get<CommonConfig>("@main/config/common");
