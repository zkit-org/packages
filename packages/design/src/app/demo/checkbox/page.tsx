'use client';

import {Checkbox} from "@easykit/design";
import { useEffect, useState } from 'react'

const Page = () => {

  const [value, setValue] = useState(false)

  useEffect(() => {
    console.log('value', value)
  }, [value])

  return (
    <div className="p-4">
      <Checkbox checked={value} onCheckedChange={(v) => setValue(v as boolean)} label="test">
        Test
      </Checkbox>
    </div>
  )
}

export default Page;
