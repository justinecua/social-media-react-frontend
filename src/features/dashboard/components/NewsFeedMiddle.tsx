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

const LIMIT = 5;

const NewsFeedMiddle = () => {
  const [offset, setOffset] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const { data, isFetching } = useGetPostsQuery({ offset, limit: LIMIT });

  console.log(data);

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
              <PostPhotos post={post} isModal={true} isProfile={false} />
              <PostReactions item={post} isProfile={false} />
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>

      <FloatingActions />
    </div>
  );
};

export default NewsFeedMiddle;
