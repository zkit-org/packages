'use client'

import { useState } from 'react'
import { Dialog } from '@easykit/design'

const Page = () => {
  const [visible, setVisible] = useState(false)
  const title = '启用二次验证'
  return (
    <div className="p-4">
      <button className="cursor-pointer" onClick={() => setVisible(true)} type="button">
        {title}
      </button>
      <Dialog maskClosable={false} onCancel={() => setVisible(false)} title={title} visible={visible}>
        <p>启用二次验证</p>
      </Dialog>
    </div>
  )
}

export default Page
