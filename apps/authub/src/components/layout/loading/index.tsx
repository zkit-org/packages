import { Spin } from "@easykit/design";

export const LoadingLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin className="size-6" />
    </div>
  );
};
