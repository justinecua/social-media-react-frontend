import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostTopNav from "@/features/dashboard/components/Feed/PostTopNav";
import PostCaptions from "@/features/dashboard/components/Feed/PostCaptions";
import PostReactions from "@/features/dashboard/components/Feed/PostReactions";
import PostPhotos from "@/features/dashboard/components/Feed/PostPhotos";

const ProfileTabs = ({ item, posts, allPhotos }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const totalPosts = posts.length > 1 ? "Posts" : "Post";
  const totalPhotos = allPhotos.length > 1 ? "Photos" : "Photo";
  const countThoughts = posts.filter(
    (post) => !post.photos || post.photos.length === 0
  ).length;

  const totalThoughts = countThoughts > 1 ? "Thoughts" : "Thought";
  const thoughts = posts.filter(
    (post) => !post.photos || post.photos.length === 0
  );

  console.log(thoughts);

  const openGallery = (index) => {
    setSelectedPhotoIndex(index);
    setDialogOpen(true);
  };

  return (
    <Card className="bg-[var(--home-card)] border-0 p-0 w-full mt-1">
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full bg-[var(--home-card)] bg-none">
          <TabsTrigger
            value="posts"
            className="
                rounded-none pt-4.5 pb-4.5 cursor-pointer
                border-0
                !bg-transparent !hover:bg-transparent
                data-[state=active]:border-b-2
                data-[state=active]:border-[var(--accent-color)]
              "
          >
            {posts.length} {totalPosts}
          </TabsTrigger>

          <TabsTrigger
            value="photos"
            className="
                rounded-none pt-4.5 pb-4.5 cursor-pointer
                border-0
                !bg-transparent !hover:bg-transparent
                data-[state=active]:border-b-2
                data-[state=active]:border-[var(--accent-color)]
              "
          >
            {allPhotos.length} {totalPhotos}
          </TabsTrigger>

          <TabsTrigger
            value="thoughts"
            className="
                rounded-none pt-4.5 pb-4.5 cursor-pointer
                border-0
                !bg-transparent !hover:bg-transparent
                data-[state=active]:border-b-2
                data-[state=active]:border-[var(--accent-color)]
              "
          >
            {countThoughts} {totalThoughts}
          </TabsTrigger>

          <TabsTrigger
            value="about"
            className="
                rounded-none pt-4.5 pb-4.5 cursor-pointer
                border-0
                !bg-transparent !hover:bg-transparent
                data-[state=active]:border-b-2
                data-[state=active]:border-[var(--accent-color)]
              "
          >
            About
          </TabsTrigger>
        </TabsList>

        {/* Posts Content*/}
        <TabsContent
          value="posts"
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mt-5"
        >
          {posts.map((post) => (
            <div key={post.id} className="break-inside-avoid mb-4">
              <Card className="bg-[var(--background)]">
                <CardContent>
                  <PostTopNav post={post} />
                  <PostCaptions post={post} />
                  <PostPhotos post={post} isModal={true} isProfile={true} />
                  <PostReactions item={post} isProfile={true} />
                </CardContent>
              </Card>
            </div>
          ))}
        </TabsContent>

        {/* Photos Content*/}
        <TabsContent
          value="photos"
          className="mt-5 justify-center grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4"
        >
          {allPhotos.map((photo, index) => (
            <div key={index} onClick={() => openGallery(index)}>
              <img
                src={photo}
                alt=""
                onClick={() => openGallery(index)}
                className="cursor-pointer w-90 h-50 object-cover rounded-md hover:brightness-55 transition"
              />
            </div>
          ))}

          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogPortal>
              <DialogOverlay className="w-full h-full bg-black/80" />
              <DialogTitle></DialogTitle>
              <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="min-w-[90%] h-[90%] flex items-center justify-center p-0 bg-transparent"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={allPhotos[selectedPhotoIndex]}
                    alt=""
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </TabsContent>

        {/* Thoughts Content*/}
        <TabsContent
          value="thoughts"
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mt-5"
        >
          {thoughts.map((thought, index) => (
            <div key={index} className="break-inside-avoid mb-4">
              <Card className="bg-[var(--background)] ">
                <CardContent>
                  <PostTopNav post={thought} />
                  <PostCaptions post={thought} />
                  <PostPhotos post={thought} isModal={true} />
                  <PostReactions item={thought} isProfile={true} />
                </CardContent>
              </Card>
            </div>
          ))}
        </TabsContent>

        {/* About Content*/}
        <TabsContent
          className="flex flex-col pt-5 cursor-pointer"
          value="about"
        >
          <span>{item?.date_joined}</span>
          <span>{item?.gender}</span>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ProfileTabs;
