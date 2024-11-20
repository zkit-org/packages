'use client';

import {TreeSelect} from "@easykit/design/components/uix/tree-select";
import {useState} from "react";

const Page = () => {
    const [value, setValue] = useState<string | undefined>(undefined);

    return <div className={"p-4"}>
        <TreeSelect
            loading={false}
            clearable={true}
            placeholder={"请选择"}
            onChange={setValue}
            value={value}
            treeData={[]}
        />
    </div>;
}

export default Page;
