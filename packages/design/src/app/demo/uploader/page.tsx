'use client'

import { type UploadFile, Uploader } from '@easykit/design'
import { useEffect, useState } from 'react'

const Page = () => {
  const [files, setFiles] = useState<UploadFile[]>([])

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <div className="p-4">
      <Uploader
        value={files}
        onChange={setFiles}
        uploadHandle={(props) => {
          props.onSuccess({
            ...props.file,
            response: {
              code: 0,
              data: 'https://easykit.cn/api/upload/file/123.png',
            },
          })
        }}
      />
    </div>
  )
}

export default Page
