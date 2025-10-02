import { Spin } from "@easykit/design";

export const LoadingLayout = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Spin className="size-6" />
    </div>
  );
};
