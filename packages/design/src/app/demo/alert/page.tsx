'use client';

import { Alert, useAlert } from '@easykit/design'
import { Info } from 'lucide-react'

const Page = () => {
  const alert = useAlert()

  const test = () => {
    alert.confirm({
      title: '删除？',
      description: '是否要删除这条记录，所有的子权限以及关联的角色权限将会失效，是否继续？',
      cancelText: '取消',
      okText: '删除',
      // biome-ignore lint/suspicious/useAwait: <explanation>
      onOk: async () => {
        console.log('ok')
        return false
      },
    })
  }

  return (
    <div className="p-4">
      <Alert icon={<Info />} title="test">
        test
      </Alert>
    </div>
  )
}

export default Page
