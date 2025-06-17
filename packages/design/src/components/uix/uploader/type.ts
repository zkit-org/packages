export type UploadFile = File & {
  uid: string
  status: 'init' | 'uploading' | 'done' | 'error'
  progress: number
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  response?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  error?: any
  controller?: AbortController
}