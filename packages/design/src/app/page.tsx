'use client';

import {Button, Input, Loading} from "@easykit/design";

export default function Home() {
  return <div>
    <Loading loading={false}>
      <Button variant={"destructive"}>
        <span>Add</span>
      </Button>
      <Input />
      <div className={"w-8 h-8 bg-destructive"}></div>
    </Loading>
  </div>;
}
