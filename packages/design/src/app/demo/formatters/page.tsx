'use client';

import {ValueFormatter} from "@easykit/design";
import "@/plugin/formatters"

const Page = () => {
  return (
    <div className="p-4">
      <ValueFormatter value={['a', 'b']} formatters={['join']} />
    </div>
  )
}

export default Page;
