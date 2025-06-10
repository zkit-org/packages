'use client';

import {Select} from "@easykit/design";

const Page = () => {
  return (
    <div className="p-4">
      <Select
        placeholder="Select a fruit"
        onChange={(value) => {
          console.log(value)
        }}
        allowClear={true}
        options={[
          {
            label: 'Apple',
            value: 'apple',
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
      />
    </div>
  )
}

export default Page;
