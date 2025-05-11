'use client';

import {Dialog} from "@easykit/design";
import {useState} from 'react';

const Page = () => {
  const [visible, setVisible] = useState(false);
  const title = "启用二次验证";
  return <div className={"p-4"}>
    <a
      onClick={() => setVisible(true)}
      className={"cursor-pointer"}
    >
      {title}
    </a>
    <Dialog
      visible={visible}
      title={title}
      maskClosable={false}
      onCancel={() => setVisible(false)}
    >
      <p>启用二次验证</p>
    </Dialog>
  </div>
}

export default Page;
