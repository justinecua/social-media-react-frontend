import { useState } from "react";
import NoProfile from "../../../../assets/images/No-Profile.jpg";

const PostTopNav = ({ post }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center ">
      <img
        src={imgError ? NoProfile : post?.profile_photo}
        alt=""
        className="w-10 h-10 rounded-full mr-3 object-cover"
        onError={() => setImgError(true)}
      />
      <p className="text-[0.8rem]">
        {post?.username} {post?.dateTime}
      </p>
    </div>
  );
};

export default PostTopNav;
