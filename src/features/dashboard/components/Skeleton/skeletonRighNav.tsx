import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRightNav = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-2/3 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />

      <div className="mt-6 text-sm">
        <Skeleton className="h-4 w-1/3 rounded-md" />
        <div className="mt-4 grid grid-cols-5 gap-4">
          {Array.from({ length: 30 }).map((_, i) => (
            <Skeleton key={i} className="w-9 h-9 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonRightNav;
