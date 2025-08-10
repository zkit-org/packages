import type { HandleProps } from './type'

import axios from 'axios'

export const defaultUploadHandle = (props: HandleProps) => {
  const { file, action, headers, data, onProgress, onSuccess, onError } = props
  if (!action) {
    file.status = 'error'
    file.error = new Error('action is required')
    onError(file)
    return
  }
  const controller = new AbortController()
  file.controller = controller
  const formData = new FormData()
  formData.append('file', file)
  // biome-ignore lint/suspicious/noExplicitAny: <appendData>
  const appendData = (data || {}) as unknown as any
  for (const key of Object.keys(appendData)) {
    formData.append(key, appendData[key])
  }
  axios
    .post(action, formData, {
      headers,
      onUploadProgress: (progressEvent) => {
        file.progress = Math.ceil(progressEvent.progress! * 100)
        onProgress(file)
      },
      signal: controller.signal,
    })
    .then((response) => {
      file.status = 'done'
      file.response = response
      onSuccess(file)
    })
    .catch((error) => {
      file.status = 'error'
      file.error = error
      onError(file)
    })
}
