'use client'

import { useState } from 'react'
import { Card, DataTable, Input } from '@easykit/design'

type Project = {
  id: number
  name: string
  createTime: number
}

const initialParams = {
  teamId: '',
  keyword: '',
  type: 'all',
  page: 1,
  size: 20,
}

const Page = () => {
  const [loading] = useState(false)

  return (
    <div className="p-4">
      <Card className="shadow-none">
        <DataTable<Project>
          checkbox={true}
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
              enableHiding: true,
              className: 'w-[200px] min-w-[200px]',
            },
            {
              accessorKey: 'createTime',
              header: '创建时间',
              enableHiding: true,
              formatters: ['time'],
              className: 'w-[200px] min-w-[200px]',
            },
          ]}
          data={[
            {
              id: 1,
              name: '1',
              createTime: new Date('2025-01-01').getTime(),
            },
            {
              id: 2,
              name: '2',
              createTime: new Date('2025-01-02').getTime(),
            },
          ]}
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
          inCard={true}
          load={async () => {}}
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
          pagination={{
            total: 110,
            page: 2,
            size: 20,
          }}
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
        />
      </Card>
    </div>
  )
}

export default Page
