'use client';

import {Tree} from "@easykit/design";
import {useState} from "react";

const Page = () => {
    const [checkedKeys, setCheckedKeys] = useState<string[]>(['3', '2-2']);

    console.log(checkedKeys);

    return <div className={"p-4"}>
        <Tree
            checkedKeys={checkedKeys}
            onCheck={(keys, e) => {
                setCheckedKeys(keys as string[]);
            }}
            selectable={false}
            checkable={true}
            treeData={[
                {
                    key: "1",
                    title: "1",
                    children: [
                        {
                            key: "1-1",
                            title: "1-1",
                            disabled: true,
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
