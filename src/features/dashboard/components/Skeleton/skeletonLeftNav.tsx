import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLeftNav = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        <Skeleton className="w-[50px] h-[50px] rounded-md" />
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
      <Skeleton className="h-6 w-12 rounded-md" />
    </div>
  );
};

export default SkeletonLeftNav;
