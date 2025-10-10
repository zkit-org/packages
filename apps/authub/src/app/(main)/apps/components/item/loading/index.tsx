import { Skeleton } from "@easykit/design";

export const AppItemLoading = () => {
  return (
    <div className="flex flex-row items-start gap-md rounded-xl border border-transparent bg-card p-lg hover:border-border">
      <Skeleton className="size-20 rounded-md bg-muted [&>span]:rounded-md" />
      <div className="flex flex-1 flex-col gap-sm">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};
