import { useState } from "react";
import { useTheme } from "@/components/themes/theme-provider";

import glowOnOriginal from "../../../../assets/icons/glow.png";
import glowOffOriginal from "../../../../assets/icons/glow-outline.png";
import commentOnOriginal from "../../../../assets/icons/comments.png";
import commentOffOriginal from "../../../../assets/icons/comments-outline.png";
import glowOutlineBlackOriginal from "../../../../assets/icons/glow-outline-black.png";
import commentOutlineBlackOriginal from "../../../../assets/icons/comments-outline-black.png";
import LoginAlert from "../modal/LoginAlert";
import CommentModal from "../modal/CommentModal";

import { useNavigate } from "react-router-dom";
import { getStoredUser } from "@/utils/auth";
import {
  useSendGlowMutation,
  useSendunGlowMutation,
} from "@/redux/services/posts/posts";
import { send } from "process";
import { toast } from "sonner";

const PostReactions = ({ item, isProfile = false }) => {
  const [glowStates, setGlowStates] = useState({});
  const [commentStates, setCommentStates] = useState({});
  const { resolvedTheme } = useTheme();
  const [showAlert, setShowAlert] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();
  const [sendGlow] = useSendGlowMutation();
  const [sendunGlow] = useSendunGlowMutation();

  const user = getStoredUser();
  const accId = user?.user?.account_id;

  const reactColorBg = isProfile
    ? "bg-[var(--home-card)]"
    : "bg-[var(--photo-bg)]";

  let glowOn = glowOnOriginal;
  let glowOff = glowOffOriginal;
  let commentOn = commentOnOriginal;
  let commentOff = commentOffOriginal;
  let glowOutlineBlack = glowOutlineBlackOriginal;
  let commentOutBlack = commentOutlineBlackOriginal;

  if (resolvedTheme === "light") {
    glowOn = glowOnOriginal;
    glowOff = glowOutlineBlack;
    commentOn = commentOnOriginal;
    commentOff = commentOutBlack;
  }

  /*---------------------------- Like Algorithm ------------------------ */

  //case: Each post has an array of users who glows it
  //1. Get the account_id of the user from the localStorage
  //2. To check if the user glowed a post:
  // Check if that account_id exists on the glowers array in each post
  //3.

  //Note: ?? means if the value on the left is null or undefined , use the value on the right

  //sample:
  // item?.glowers?.forEach((glowerId) => {
  //   glowerId === accId ? true : false;
  // });
  //or just simply:
  //item?.glowers?.includes(accId);

  const toggleGlow = async (postId) => {
    if (!user) {
      setShowAlert(true);
      return;
    }

    const payload = {
      postId: postId,
      accID: accId,
    };

    const currentlyGlowed =
      glowStates[postId] ?? item?.glowers?.includes(accId);

    setGlowStates((prev) => ({
      ...prev,
      [postId]: !currentlyGlowed,
    }));

    try {
      if (currentlyGlowed) {
        const response = await sendunGlow(payload).unwrap();
        toast(response.message);
      } else {
        const response = await sendGlow(payload).unwrap();
        toast(response.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  const toggleComment = (post_id) => {
    if (user) {
      setCommentStates((prev) => ({
        ...prev,
        [post_id]: !prev[post_id],
      }));
      console.log("Show comment");
      setShowComment(true);
    } else {
      setShowComment(true);
      console.log("show comment but not logged in");
    }
  };

  const initiallyGlowed = item?.glowers?.includes(accId);
  const isGlowOn = glowStates[item.id] ?? initiallyGlowed ?? false;
  const isCommentOn = commentStates[item.id] || false;

  /*---------------------------- Like Algorithm ------------------------ */

  return (
    <>
      <div className="flex gap-2 w-full">
        <button
          onClick={() => toggleGlow(item.id)}
          className={`flex  items-center mt-1 px-3 py-2 rounded-lg transition-transform duration-150 relative overflow-hidden cursor-pointer
        ${
          isGlowOn
            ? "bg-[#2442de] animate-pulse shadow-[0_2px_13px_#2442de]"
            : "bg-[var(--photo-bg)]"
        }`}
        >
          <img
            src={isGlowOn ? glowOn : glowOff}
            alt="Glow Icon"
            className="w-4 h-4 transition-transform duration-200"
          />
          <span
            className={`ml-2 ${
              isGlowOn
                ? "text-white"
                : resolvedTheme === "light"
                ? "text-black"
                : "text-[#f9f8fa]"
            }`}
          >
            {item?.glow_count +
              (glowStates[item.id] === true && !initiallyGlowed ? 1 : 0) -
              (glowStates[item.id] === false && initiallyGlowed ? 1 : 0)}
          </span>
        </button>

        <button
          onClick={toggleComment}
          className={`flex bg-[var(--photo-bg)] items-center mt-1 px-3 py-2 rounded-lg transition-transform duration-150 cursor-pointer`}
        >
          <img
            src={isCommentOn ? commentOn : commentOff}
            alt="Comment Icon"
            className="w-4.5 h-4.5 transition-transform duration-200"
          />
          <span
            className={`ml-2 ${
              isCommentOn
                ? "text-white"
                : resolvedTheme === "light"
                ? "text-black"
                : "text-[#f9f8fa]"
            }`}
          >
            {item?.comment_count}
          </span>
        </button>
      </div>

      <LoginAlert
        open={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => {
          setShowAlert(false);
          navigate("/login");
        }}
      />

      <CommentModal
        open={showComment}
        post={item}
        onClose={(val) => setShowComment(val)}
      />
    </>
  );
};

export default PostReactions;
