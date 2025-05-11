'use client';

import {Select} from "@easykit/design";

const Page = () => {
  return <div className={"p-4"}>
    <Select
      placeholder="Select a fruit"  
      options={[
        {
          label: "Apple",
          value: "apple",
        },
        {
          label: "Banana",
          value: "banana",
        },
        {
          label: "Orange",
          value: "orange",
        },
      ]}
    />
  </div>;
}

export default Page;
