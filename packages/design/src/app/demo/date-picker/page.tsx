'use client';

import {DatePicker} from "@easykit/design";

const Page = () => {
  return (
    <div className="p-4">
      <DatePicker allowClear={true} preset={true} />
    </div>
  )
}

export default Page;
