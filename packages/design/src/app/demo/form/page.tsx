'use client';

import * as z from "zod";
import {Button, Form, FormItem, Select} from '@easykit/design';
import {useCallback, useRef} from 'react';
import {UseFormReturn} from 'react-hook-form';

const getSchema = () => z.object({
  teamId: z.string(),
  projectId: z.string(),
})

const Page = () => {
  const formRef = useRef<UseFormReturn>(null);

  const onSubmit = useCallback((data: any) => {
    console.log('onSubmit', data);
  }, [])

  return <div className={"p-4"}>
    <Form
      ref={formRef}
      schema={getSchema()}
      onSubmit={onSubmit}
      defaultValues={{
        teamId: "1",
        projectId: "1",
      }}
    >
      <FormItem name="teamId" label={"团队"}>
        <Select
          placeholder={"请选择"}
          options={[
            {
              label: "Team 1",
              value: "1",
            },
            {
              label: "Team 2",
              value: "2",
            }
          ]}
          onChange={(e) => {
            formRef.current?.setValue("projectId", "");
          }}
        />
      </FormItem>
      <FormItem name="projectId" label={"团队"}>
        <Select
          placeholder={"请选择"}
          options={[
            {
              label: "Project 1",
              value: "1",
            },
            {
              label: "Project 2",
              value: "2",
            }
          ]}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </FormItem>
      <Button type="submit">Submit</Button>
    </Form>
  </div>
}

export default Page;
