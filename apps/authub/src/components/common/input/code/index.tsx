import type { ChangeEvent, ComponentProps, FC } from "react";

import { Input } from "@easykit/design";

export const CodeInput: FC<ComponentProps<typeof Input>> = (props) => {
  const { onChange, ...rest } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    v = v ? v.replace(/[^\d]/g, "") : v;
    e.target.value = v;
    onChange?.(e);
  };

  return <Input {...rest} maxLength={6} onChange={handleChange} />;
};
