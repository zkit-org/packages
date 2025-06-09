'use client';

import {Alert, Button, Form, FormItem, Select} from '@easykit/design';
import { useCallback, useRef } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { object, string, type z } from 'zod'

const getSchema = () =>
  object({
    teamId: string(),
    projectId: string(),
  })

type FormData = z.infer<ReturnType<typeof getSchema>>

const Page = () => {
  const formRef = useRef<UseFormReturn<FormData>>(null)

  const onSubmit = useCallback((data: FormData) => {
    console.log('onSubmit', data)
  }, [])

  return (
    <div className="p-4">
      <Form<FormData>
        ref={formRef}
        schema={getSchema()}
        onValuesChange={(data) => {
          console.log('onValuesChange', data)
        }}
        onSubmit={onSubmit}
        defaultValues={{
          teamId: '1',
          projectId: '1',
        }}
      >
        <FormItem name="teamId" label="团队" description="请选择团队">
          <Select
            placeholder="请选择"
            options={[
              {
                label: 'Team 1',
                value: '1',
              },
              {
                label: 'Team 2',
                value: '2',
              },
            ]}
            onChange={() => {
              formRef.current?.setValue('projectId', '')
            }}
          />
        </FormItem>
        <Alert
          className="bg-secondary text-secondary-foreground"
          description="将会同时创建名为“默认项目”的初始项目。"
        />
        <FormItem name="projectId" label="团队">
          <Select
            placeholder="请选择"
            options={[
              {
                label: 'Project 1',
                value: '1',
              },
              {
                label: 'Project 2',
                value: '2',
              },
            ]}
            onChange={(e) => {
              console.log(e)
            }}
          />
        </FormItem>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default Page;
