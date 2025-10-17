"use client";

import { useCallback } from "react";
import { object, string, type z } from "zod";

import { Alert, Button, Form, FormItem, Input, Select } from "@easykit/design";

const getSchema = () =>
  object({
    teamId: string(),
    projectId: string(),
    password: string(),
    password2: string(),
  }).superRefine(({ password, password2 }, ctx) => {
    if (password !== password2) {
      ctx.addIssue({
        code: "custom",
        path: ["password2"],
        message: "两次密码输入不一致",
      });
    }
  });

type FormData = z.infer<ReturnType<typeof getSchema>>;

const Page = () => {
  const form = Form.useForm<FormData>();

  const onSubmit = useCallback((data: FormData) => {
    console.log("onSubmit", data);
  }, []);

  const teamId = Form.useWatch("teamId", form);
  console.log("teamId", teamId);

  return (
    <div className="p-4">
      <Form<FormData>
        defaultValues={{
          teamId: "1",
          projectId: "1",
        }}
        form={form}
        onSubmit={onSubmit}
        schema={getSchema()}
      >
        <FormItem description="请选择团队" label="团队" name="teamId">
          <Select
            onChange={() => {
              form.setValue("projectId", "");
            }}
            options={[
              {
                label: "Team 1",
                value: "1",
              },
              {
                label: "Team 2",
                value: "2",
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
              console.log(e);
            }}
            options={[
              {
                label: "Project 1",
                value: "1",
              },
              {
                label: "Project 2",
                value: "2",
              },
            ]}
            placeholder="请选择"
          />
        </FormItem>
        <FormItem label="密码" name="password">
          <Input type="password" />
        </FormItem>
        <FormItem label="确认密码" name="password2">
          <Input type="password" />
        </FormItem>
      </Form>
      <Button onClick={() => form.submit()}>Submit</Button>
    </div>
  );
};

export default Page;
