import {post} from "@/utils/rest";

export type PreSignData = {
  fileName: string
  type: 0 | 1
  headers?: Record<string, string>
}

export type PreSignResult = {
  fileName: string
  signedUrl: string
  url: string
}

export const preSign = (data: PreSignData) => post<PreSignResult, PreSignData>('@assets/oss/file/pre-sign', data)
