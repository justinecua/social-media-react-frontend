import { useState, useEffect } from "react";
import { useGetPostsQuery } from "../../../redux/services/posts/posts";
import { Card, CardContent } from "@/components/ui/card";
import PostPhotos from "./Feed/PostPhotos";
import PostReactions from "./Feed/PostReactions";
import PostTopNav from "./Feed/PostTopNav";
import PostCaptions from "./Feed/PostCaptions";
import SkeletonPost from "./Skeleton/skeletonPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import FloatingActions from "./Feed/FloatingActions";
import PhotoDialog from "./modal/PhotoDialog";
import { getStoredUser } from "@/utils/auth";

const LIMIT = 7;

const NewsFeedMiddle = () => {
  const [offset, setOffset] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const { data, isFetching, refetch } = useGetPostsQuery({
    offset,
    limit: LIMIT,
  });

  const user = getStoredUser();

  //Map the object data and results
  const glowers = data?.results?.map((glower) => glower?.glowers);

  // console.log(user);
  // console.log(data);
  console.log("Glowers", glowers);
  // console.log(typeof glowers);

  //Algo for Liking a post
  //case: Each post has an array of users who likes it
  //1. Get the account_id of the user from the localStorage
  //2. Check if that account_id exists on each array
  //3. Boolean True or False

  const accId = user?.user?.account_id;

  glowers?.forEach((glowerArr) => {
    if (glowerArr.includes(accId)) {
      console.log(true);
    }
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePhotoClick = (post, index) => {
    setSelectedPhotoIndex(index);
    setSelectedPost(post);
    setDialogOpen(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    // This runs every time new data is received (from the server)
    if (data?.results) {
      // If there is a list of posts in the data
      setAllPosts((prev) => {
        // Update the list of all posts
        const newPosts = data.results.filter(
          (newItem) =>
            // Check if the new post is NOT already in the old list
            !prev.some((existing) => existing.id === newItem.id)
        );
        // Add the new (not duplicated) posts to the old list
        return [...prev, ...newPosts];
      });
    }
  }, [data]); // This will run again only when 'data' changes

  const refetchPosts = (newPost) => {
    if (newPost) {
      setAllPosts((prev) => [newPost, ...prev]);
    } else {
      refetch();
    }
  };

  const fetchMorePosts = () => {
    if (!isFetching) {
      setOffset((prev) => prev + LIMIT);
    }
  };

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < LIMIT; i++) {
      skeletons.push(<SkeletonPost key={i} />);
    }
    return skeletons;
  };

  if (allPosts.length === 0 && isFetching) {
    return (
      <div className="Middle ft w-full max-w-xl h-full">
        {renderSkeletons()}
      </div>
    );
  }

  return (
    <div className="Middle ft w-full max-w-xl h-full">
      <PhotoDialog
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
        photos={selectedPost?.photos || []}
        selectedIndex={selectedPhotoIndex}
      />

      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchMorePosts}
        hasMore={data?.results?.length >= LIMIT}
        loader={<>{renderSkeletons()}</>}
        scrollThreshold={0.9}
      >
        {allPosts.map((post, index) => (
          <Card key={index} className="bg-[var(--home-card)] mb-3">
            <CardContent>
              <PostTopNav post={post} />
              <PostCaptions post={post} />
              <PostPhotos
                post={post}
                onPhotoClick={(index) => handlePhotoClick(post, index)}
              />

              <PostReactions item={post} isProfile={false} />
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>

      <FloatingActions refetchPosts={refetchPosts} />
    </div>
  );
};

export default NewsFeedMiddle;
