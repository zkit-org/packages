'use client';

import {Checkbox, CheckboxGroup} from "@easykit/design";
import {useCallback} from "react";

const Page = () => {

  const onChange = useCallback((value: string[]) => {
    console.log("onChange", value);
  }, []);

  return <div className={"p-4"}>
    <CheckboxGroup
      checkboxClassName={"mt-2"}
      options={[
        {
          label: "Option 1",
          value: "1"
        },
        {
          label: "Option 2",
          value: "2"
        }
      ]}
      onChange={onChange}
    />
  </div>
}

export default Page;
