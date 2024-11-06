'use client';

import {TreeSelect} from "@easykit/design/components/uix/tree-select";
import {useState} from "react";

const Page = () => {
    const [value, setValue] = useState<string | undefined>(undefined);

    return <div className={"p-4"}>
        <TreeSelect
            loading={false}
            clearable={true}
            onChange={setValue}
            value={value}
            treeData={[
                {
                    key: "1",
                    title: "1",
                    children: [
                        {
                            key: "1-1",
                            title: "1-1",
                        },
                        {
                            key: "1-2",
                            title: "1-2",
                        }
                    ],
                },
                {
                    key: "2",
                    title: "2",
                    children: [
                        {
                            key: "2-1",
                            title: "2-1",
                        },
                        {
                            key: "2-2",
                            title: "2-2",
                        }
                    ],
                },
                {
                    key: "3",
                    title: "3"
                }
            ]}
        />
    </div>;
}

export default Page;
