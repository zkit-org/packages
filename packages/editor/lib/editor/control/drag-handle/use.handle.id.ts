import {useMemo, useState} from "react";

export const useHandleId = () => {
  const [handleId] = useState<number>(Date.now());
  return useMemo(() => `drag-handle-${handleId}`, [handleId]);
}
