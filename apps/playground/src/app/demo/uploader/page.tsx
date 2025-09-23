'use client'

import { useEffect, useState } from 'react'
import { Uploader, type UploadFile } from '@easykit/design'

const Page = () => {
  const [files, setFiles] = useState<UploadFile[]>([])

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <div className="p-4">
      <Uploader
        maxFiles={1}
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
        value={files}
      />
    </div>
  )
}

export default Page
