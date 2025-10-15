import { useState } from "react";

import { Button } from "@easykit/design";
import { AddDialog } from "../dialog";

export const AddButton = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)} size="sm">
        添加应用
      </Button>
      <AddDialog onCancel={() => setVisible(false)} visible={visible} />
    </>
  );
};
