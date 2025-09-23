'use client'

import { Info } from 'lucide-react'
import { Alert, Button, useAlert } from '@easykit/design'

const Page = () => {
  const alert = useAlert()

  const test = () => {
    alert.confirm({
      title: '删除？',
      description: '是否要删除这条记录，所有的子权限以及关联的角色权限将会失效，是否继续？',
      cancelText: '取消',
      okText: '删除',
      onOk: () => {
        console.log('ok')
        return false
      },
    })
  }

  return (
    <div className="p-4">
      <Alert icon={<Info />} title="test">
        <Button onClick={test}>test</Button>
      </Alert>
      <Alert icon={<Info />} title="test" variant="destructive">
        error
      </Alert>
    </div>
  )
}

export default Page
