'use client';

import {Checkbox} from "@easykit/design";
import {useCallback} from "react";

const Page = () => {

  const onChange = useCallback((value: boolean) => {
    console.log("onChange", value);
  }, []);

  return (
    <div className="p-4">
      <Checkbox field={true} onChange={onChange} indeterminate={true} label="test">
        Test
      </Checkbox>
    </div>
  )
}

export default Page;
