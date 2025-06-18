import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect } from "react";

const SkeletonProfile = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Card className="bg-[var(--home-card)] w-full h-auto sm:w-[95%] p-6 md:w-[85%] lg:w-[75%] shadow-md rounded-xl">
      <CardContent className="relative w-full p-0">
        {/* Cover Photo */}
        <div className="relative w-full h-42 sm:h-44 md:h-50 lg:h-60 xl:h-70 rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full bg-[var(--button-bg-color)]" />

          {/* Profile Photo */}
          <div className="z-3 border-8 border-solid border-[var(--home-card)] absolute -bottom-[5.55rem] left-6 w-30 h-30 sm:w-38 sm:h-38 rounded-full overflow-hidden">
            <Skeleton className="z-3 w-full h-full rounded-full bg-[var(--button-bg-color)]" />
          </div>
        </div>

        {/* Name and Username */}
        <div className="ml-[9.5rem] mt-6 sm:ml-[11.5rem] md:ml-[12rem]">
          <Skeleton className="h-6 w-48 mb-2 bg-[var(--button-bg-color)]" />
          <Skeleton className="h-4 w-32 bg-[var(--button-bg-color)]" />
        </div>

        {/* Bio */}
        <div className="mt-4 ml-8 w-[55%] space-y-2">
          <Skeleton className="h-4 w-full bg-[var(--button-bg-color)]" />
          <Skeleton className="h-4 w-5/6 bg-[var(--button-bg-color)]" />
          <Skeleton className="h-4 w-3/4 bg-[var(--button-bg-color)]" />
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="posts">
            <TabsList className="flex space-x-4 bg-transparent px-2">
              {["Posts", "Photos", "Thoughts", "About"].map((label, index) => (
                <TabsTrigger
                  key={index}
                  value={label.toLowerCase()}
                  className="px-4 py-2 text-sm bg-transparent"
                >
                  <Skeleton className="w-16 h-4 bg-[var(--button-bg-color)]" />
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Posts Content */}
            <TabsContent
              value="posts"
              className="mt-5 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="break-inside-avoid mb-4">
                  <Card className="bg-[var(--background)]">
                    <CardContent className="space-y-4 p-4">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full bg-[var(--home-card)]" />
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-24 bg-[var(--home-card)]" />
                          <Skeleton className="h-2 w-16 bg-[var(--home-card)]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-[var(--home-card)]" />
                        <Skeleton className="h-4 w-5/6 bg-[var(--home-card)]" />
                      </div>
                      <Skeleton className="h-48 w-full bg-[var(--home-card)] rounded-md" />
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-20 bg-[var(--home-card)]" />
                        <Skeleton className="h-6 w-20 bg-[var(--home-card)]" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </TabsContent>

            {/* Photos Content */}
            <TabsContent
              value="photos"
              className="mt-5 justify-center grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4"
            >
              {[...Array(12)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full h-40 bg-[var(--home-card)] rounded-md"
                />
              ))}
            </TabsContent>

            {/* About Content */}
            <TabsContent value="about" className="mt-5 space-y-2">
              <Skeleton className="h-4 w-32 bg-[var(--home-card)]" />
              <Skeleton className="h-4 w-24 bg-[var(--home-card)]" />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonProfile;
