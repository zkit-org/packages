'use client';

import {Button, DataTable, Input} from "@easykit/design";

const Page = () => {
    return <div className={"p-4 space-y-2"}>
        <div>
            <Input />
        </div>
        <div>
            <Button>按钮</Button>
        </div>
        <div>
            <DataTable
                loading={true}
                filter={{
                    items: [
                        {
                            field: 'keyword',
                            render: () => <Input placeholder={"请输入关键词"}/>,
                        },
                        {
                            field: 'teamId',
                            label: "所属团队",
                            render: () => <Input placeholder={"请输入关键词"}/>,
                        },
                    ],
                }}
                columns={[
                    {
                        accessorKey: "name",
                        header: "名称",
                        enableHiding: false,
                        className: "min-w-[200px]"
                    },
                    {
                        accessorKey: "teamName",
                        header: "所属团队",
                        enableHiding: false,
                        className: "w-[200px] min-w-[200px]"
                    },
                    {
                        accessorKey: "createTime",
                        header: "创建时间",
                        enableHiding: false,
                        formatters: ["time"],
                        className: "w-[200px] min-w-[200px]"
                    }
                ]}
                rowActions={[
                    {
                        id: "detail",
                        type: "item",
                        label: "详情"
                    },
                    {
                        id: "activity",
                        type: "item",
                        label: "动态"
                    },
                ]}
                data={[
                    {

                    }
                ]}
            />
        </div>
    </div>;
}

export default Page;
