import { useGetProfileQuery } from "@/redux/services/accounts/accounts";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

import ExpandableText from "@/components/ui/custom/expandable";
import { useGetPostsByUserQuery } from "@/redux/services/posts/posts";
import ProfileTabs from "../components/ProfileTabs";
import ProfileName from "../components/ProfileName";
import ProfileCover from "../components/ProfileCover";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  if (!Array.isArray(profile)) return <p>No profile data found</p>;

  const bio =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

  return (
    <div className="p-4 w-full flex flex-col items-center h-auto ">
      {profile.map((item) => (
        <Card
          key={item.id}
          className="w-full h-full sm:w-[95%] p-6 md:w-[85%] lg:w-[75%] bg-[var(--home-card)] shadow-md rounded-xl"
        >
          {/* Cover Page */}
          <ProfileCover item={item} />

          {/* Name Info */}
          <ProfileName item={item} />

          {/* Bio Info*/}
          <div className="mt-1 ml-8 w-[55%]">
            <ExpandableText text={bio} />
          </div>

          {/* Tabs Info*/}
          <ProfileTabs item={item} posts={posts} allPhotos={allPhotos} />
        </Card>
      ))}
    </div>
  );
};

export default ProfilePage;
