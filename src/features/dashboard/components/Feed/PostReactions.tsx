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

const PostReactions = ({ item, isProfile = false }) => {
  const [glowStates, setGlowStates] = useState({});
  const [commentStates, setCommentStates] = useState({});
  const { resolvedTheme } = useTheme();
  const user = getStoredUser();
  const [showAlert, setShowAlert] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();

  const reactColorBg = isProfile
    ? "bg-[var(--home-card)]"
    : "bg-[var(--background)]";

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

  const toggleGlow = (postId) => {
    if (user) {
      setGlowStates((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
      console.log("User is logged in:", user.username || user.id);
    } else {
      console.log("User is not logged in.");
      setShowAlert(true);
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

  const isGlowOn = glowStates[item.id] || false;
  const isCommentOn = commentStates[item.id] || false;

  return (
    <>
      <div className="flex gap-2 w-full">
        <button
          onClick={() => toggleGlow(item.id)}
          className={`${reactColorBg} flex items-center mt-1 px-3 py-2 rounded-lg transition-transform duration-150 relative overflow-hidden cursor-pointer
        ${
          isGlowOn
            ? "bg-[#2442de] animate-pulse shadow-[0_2px_13px_#2442de]"
            : "bg-[var(--button-bg-color)]"
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
            {item?.glow_count}
          </span>
        </button>

        <button
          onClick={toggleComment}
          className={`flex items-center mt-1 px-3 py-2 rounded-lg ${reactColorBg} transition-transform duration-150 cursor-pointer`}
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
