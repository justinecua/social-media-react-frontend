const PostCaptions = ({ post }) => {
  return (
    <div className="mt-4 mb-1">
      <p className="text-[0.8rem]">{post?.caption}</p>
    </div>
  );
};

export default PostCaptions;
