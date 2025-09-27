'use client'

import { useEffect, useState } from 'react'
import { Checkbox } from '@easykit/design'

const Page = () => {
  const [value, setValue] = useState(false)

  useEffect(() => {
    console.log('value', value)
  }, [value])

  return (
    <div className="p-4">
      <Checkbox checked={value} label="test" onCheckedChange={(v) => setValue(v as boolean)}>
        Test
      </Checkbox>
    </div>
  )
}

export default Page
