import type { FC } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@easykit/design";

export type OTPInputProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export const OTPInput: FC<OTPInputProps> = (props) => {
  const { value, onChange } = props;

  return (
    <InputOTP maxLength={6} onChange={onChange} pattern={REGEXP_ONLY_DIGITS} value={value}>
      <InputOTPGroup>
        <InputOTPSlot className="h-12 w-12 text-xl" index={0} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={1} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={2} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={3} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={4} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};
