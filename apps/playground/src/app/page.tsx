'use client';

import { Button, Empty, Input, Loading } from "@easykit/design";

export default function Home() {
  return (
    <div>
      <Loading loading={false}>
        <Button variant="destructive">
          <span>Add</span>
        </Button>
        <Input />
        <div className="h-8 w-8 bg-destructive" />
        <Empty />
      </Loading>
    </div>
  );
}
