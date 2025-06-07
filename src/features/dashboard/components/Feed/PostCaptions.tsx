import ExpandableText from "@/components/ui/custom/expandable";

const PostCaptions = ({ post }) => {
  if (!post?.caption) return null;

  return (
    <div className="mt-4 mb-1">
      <ExpandableText text={post?.caption} />
    </div>
  );
};

export default PostCaptions;
