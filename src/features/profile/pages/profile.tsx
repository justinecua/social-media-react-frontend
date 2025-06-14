import { useGetProfileQuery } from "@/redux/services/accounts/accounts";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useGetPostsByUserQuery } from "@/redux/services/posts/posts";
import ProfileTabs from "../components/ProfileTabs";
import ProfileName from "../components/ProfileName";
import ProfileCover from "../components/ProfileCover";
import SkeletonProfile from "@/features/dashboard/components/Skeleton/skeletonProfile";
import ProfileBio from "../components/ProfileBio";

const ProfilePage = () => {
  const { id } = useParams();

  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileQuery({ profile_id: id });

  const {
    data: userPosts,
    isLoadingUser,
    errorUser,
  } = useGetPostsByUserQuery({ account_id: id });

  const posts = userPosts?.results ?? [];
  const allPhotos = posts.flatMap((post) => post.photos || []);
  // Get all photos from all posts into one flat array, skipping posts with no photos (Flat array means a simple list with no nested arrays)

  if (isLoading) {
    return (
      <div className="p-4 w-full flex flex-col items-center h-full">
        <SkeletonProfile />
      </div>
    );
  }

  if (error) return <p>Something went wrong</p>;
  if (!Array.isArray(profile)) return <p>No profile data found</p>;

  return (
    <div className=" w-full flex flex-col items-center min-h-screen">
      {profile.map((item) => (
        <Card
          key={item.id}
          className="w-full h-full sm:w-[95%] p-4 md:w-[85%] lg:w-[75%] bg-[var(--home-card)] shadow-md rounded-xl"
        >
          {/* Cover Page */}
          <ProfileCover item={item} />

          {/* Name Info */}
          <ProfileName item={item} />

          {/* Bio Info*/}
          <ProfileBio item={item} id={id} />

          {/* Tabs Info*/}
          <ProfileTabs item={item} posts={posts} allPhotos={allPhotos} />
        </Card>
      ))}
    </div>
  );
};

export default ProfilePage;
