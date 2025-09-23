'use client'

import { ValueFormatter } from '@easykit/design'
import '@/plugin/formatters'

const Page = () => {
  return (
    <div className="p-4">
      <ValueFormatter formatters={['join']} value={['a', 'b']} />
    </div>
  )
}

export default Page
