export type UploadFile = File & {
  uid: string
  status: 'init' | 'uploading' | 'done' | 'error'
  progress: number
  // biome-ignore lint/suspicious/noExplicitAny: <response>
  response?: any
  // biome-ignore lint/suspicious/noExplicitAny: <error>
  error?: any
  controller?: AbortController
}

export type HandleProps = {
  file: UploadFile
  action?: string
  headers?: Record<string, string>
  data?: unknown
  onProgress: (file: UploadFile) => void
  onSuccess: (file: UploadFile) => void
  onError: (file: UploadFile) => void
}