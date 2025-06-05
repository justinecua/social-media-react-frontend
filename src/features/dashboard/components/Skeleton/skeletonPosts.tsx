import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonPost = () => (
  <Card className="bg-[var(--home-card)] mb-3">
    <CardContent className="space-y-3 py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-60 w-full rounded-lg" />
      <div className="flex gap-3 mt-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </CardContent>
  </Card>
);

export default SkeletonPost;
