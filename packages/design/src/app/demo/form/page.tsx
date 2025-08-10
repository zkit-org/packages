'use client'

import { useCallback, useRef } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { object, string, type z } from 'zod'
import { Alert, Button, Form, FormItem, Select } from '@easykit/design'

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
        defaultValues={{
          teamId: '1',
          projectId: '1',
        }}
        onSubmit={onSubmit}
        onValuesChange={(data) => {
          console.log('onValuesChange', data)
        }}
        ref={formRef}
        schema={getSchema()}
      >
        <FormItem description="请选择团队" label="团队" name="teamId">
          <Select
            onChange={() => {
              formRef.current?.setValue('projectId', '')
            }}
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
            placeholder="请选择"
          />
        </FormItem>
        <Alert
          className="bg-secondary text-secondary-foreground"
          description="将会同时创建名为“默认项目”的初始项目。"
        />
        <FormItem label="团队" name="projectId">
          <Select
            onChange={(e) => {
              console.log(e)
            }}
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
            placeholder="请选择"
          />
        </FormItem>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default Page
