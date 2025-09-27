'use client'

import { Select } from '@easykit/design'

const Page = () => {
  return (
    <div className="p-4">
      <Select
        allowClear={true}
        onChange={(value) => {
          console.log(value)
        }}
        options={[
          {
            label: 'Apple',
            value: 'apple',
            disabled: true,
          },
          {
            label: 'Banana',
            value: 'banana',
          },
          {
            label: 'Orange',
            value: 'orange',
          },
        ]}
        placeholder="Select a fruit"
      />
    </div>
  )
}

export default Page
