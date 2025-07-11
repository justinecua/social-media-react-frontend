import { useGetCommentsQuery } from "@/redux/services/posts/posts";
import NoProfile from "@/assets/images/No-Profile.jpg";
import { useEffect, useState } from "react";

const PostComments = ({ post, refetchKey }) => {
  const {
    data: comments,
    isFetching,
    refetch,
  } = useGetCommentsQuery({
    post_id: post?.id,
  });

  const [imgErrors, setImgErrors] = useState({});

  const setImgError = (index) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  useEffect(() => {
    if (refetchKey !== null) {
      refetch();
    }
  }, [refetchKey]);

  return (
    <>
      {post && comments?.length > 0 ? (
        <div className="flex flex-col">
          {comments.map((comment, index) => (
            <div key={index} className="bg-[var(--home-card)] rounded-lg p-4 ">
              <div className="flex items-center gap-2">
                <img
                  src={imgErrors[index] ? NoProfile : comment?.profile_photo}
                  alt={comment.username}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={() => setImgError(index)}
                />
                <span className="font-semibold text-[0.8rem] ml-1">
                  {comment.username}
                </span>
                <span className="text-[0.7rem]">{comment.dateTime}</span>
              </div>
              <p className="rounded-md ml-12">{comment.comment}</p>
            </div>
          ))}
          {isFetching && (
            <div className="flex justify-center items-center w-full h-full p-4">
              <p>Loading comments...</p>
            </div>
          )}
        </div>
      ) : isFetching ? (
        <div className="flex justify-center items-center w-full h-full p-4">
          <p>Loading comments...</p>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full p-4">
          <p className="text-[var(--color-subtitle)]">No comments found</p>
        </div>
      )}
    </>
  );
};

export default PostComments;
