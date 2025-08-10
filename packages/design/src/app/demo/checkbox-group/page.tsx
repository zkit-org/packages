'use client'

import { useCallback } from 'react'
import { CheckboxGroup } from '@easykit/design'

const Page = () => {
  const onChange = useCallback((value: string[]) => {
    console.log('onChange', value)
  }, [])

  return (
    <div className="p-4">
      <CheckboxGroup
        checkboxClassName="mt-2"
        onChange={onChange}
        options={[
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ]}
      />
    </div>
  )
}

export default Page
