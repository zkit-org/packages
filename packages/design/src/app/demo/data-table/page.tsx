'use client';

import {Card, DataTable, Input} from "@easykit/design";
import {useState} from "react";

type Project = {
  id: number;
  name: string;
  createTime: number;
}

const initialParams = {
  teamId: '',
  keyword: '',
  type: 'all',
  page: 1,
  size: 20,
}

const Page = () => {
  const [loading] = useState(false);

  return (
    <div className="p-4">
      <Card className="shadow-none">
        <DataTable<Project>
          checkbox={true}
          inCard={true}
          filter={{
            items: [
              {
                field: 'keyword',
                render: () => <Input placeholder="请输入关键词" />,
              },
              {
                field: 'teamId',
                label: '所属团队',
                render: () => <Input placeholder="请输入关键词" />,
              },
            ],
            defaultValues: initialParams,
            query: initialParams,
          }}
          // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
          load={async () => {}}
          pagination={{
            total: 110,
            page: 2,
            size: 20,
          }}
          columns={[
            {
              accessorKey: 'id',
              header: '名称',
              enableHiding: false,
              className: 'min-w-[200px]',
            },
            {
              accessorKey: 'name',
              header: '所属团队',
              enableHiding: false,
              className: 'w-[200px] min-w-[200px]',
            },
            {
              accessorKey: 'createTime',
              header: '创建时间',
              enableHiding: false,
              formatters: ['time'],
              className: 'w-[200px] min-w-[200px]',
            },
          ]}
          rowActions={() => [
            {
              id: 'detail',
              type: 'item',
              label: '详情',
            },
            {
              id: 'activity',
              type: 'item',
              label: '动态',
            },
          ]}
          data={[
            {
              id: 1,
              name: '1',
              createTime: Date.now(),
            },
            {
              id: 2,
              name: '2',
              createTime: Date.now(),
            },
          ]}
          loading={loading}
          onRowActionClick={({ id: key }, { original }) => {
            const { id } = original
            console.log(id, key)
            // if(key === "detail") {
            //     router.push(`/i18n/${original.identifier}/dashboard`);
            // }else if(key === "activity") {
            //     router.push(`/i18n/${original.identifier}/activity`);
            // }else if(key === "delete") {
            //
            // }
          }}
          onRowClick={(row) => {
            console.log(row)
            // const { identifier } = row.original;
            // router.push(`/i18n/${identifier}/dashboard`);
          }}
        />
      </Card>
    </div>
  )
}

export default Page;
