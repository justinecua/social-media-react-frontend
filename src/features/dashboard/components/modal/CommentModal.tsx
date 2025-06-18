import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Send, SmilePlus, X } from "lucide-react";
import PostTopNav from "../Feed/PostTopNav";
import PostCaptions from "../Feed/PostCaptions";
import PostPhotos from "../Feed/PostPhotos";
import PostComments from "../Feed/PostComments";
import { useEffect, useRef, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { getStoredUser } from "@/utils/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import { useTheme } from "@/components/themes/theme-provider";
import { toast } from "sonner";
import { useAddCommentMutation } from "@/redux/services/posts/posts";

const CommentModal = ({ open, onClose, post }) => {
  const hasPhotos = post?.photos?.length > 0;
  const commentCount = post?.comment_count;
  const user = getStoredUser();

  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const [addComment, { isLoading }] = useAddCommentMutation();
  const [refetchKey, setRefetchKey] = useState(0);
  const [localCommentCount, setLocalCommentCount] = useState(
    post?.comment_count || 0
  );

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    setComment((prev) => prev + emoji);
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    const payload = {
      accID: user?.user?.account_id,
      postId: post?.id,
      comment: comment,
    };

    try {
      const response = await addComment(payload).unwrap();
      toast("Comment added successfully!");
      setComment("");
      setRefetchKey((prev) => prev + 1);
      setLocalCommentCount((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to add comment:", err);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    setLocalCommentCount(post?.comment_count || 0);
  }, [post]);

  const isAuthenticated = () => {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent
          className={`bg-[var(--home-card)] p-0 rounded-lg overflow-hidden transition-all duration-300 ease-in-out z-[50] ${
            hasPhotos
              ? "max-w-[95vw] lg:max-w-[85vw] xl:max-w-[1100px] 2xl:max-w-[1200px]"
              : "max-w-[95vw] sm:max-w-[500px]"
          }`}
        >
          <div
            className={`flex transition-all duration-300 ease-in-out ${
              hasPhotos ? "flex-col lg:flex-row" : "flex-col"
            } max-h-[90vh]`}
          >
            {/* Left side: post content */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                hasPhotos
                  ? "w-full flex flex-col overflow-y-hidden lg:overflow-y-auto lg:w-1/2"
                  : "max-h-[70vh]  border-b"
              } p-4`}
            >
              <PostTopNav post={post} />
              <PostCaptions post={post} />
              {hasPhotos && (
                <div className="flex-1 min-h-0 mt-3">
                  {" "}
                  {/* Added 'flex' here */}
                  <PostPhotos post={post} isModal={true} />
                </div>
              )}
            </div>

            {/* Right side: comments */}
            <DialogDescription
              className={`transition-all duration-300 ease-in-out ${
                hasPhotos
                  ? "md:border-l w-full lg:w-1/2 flex flex-col overflow-y-auto max-h-[40vh] lg:max-h-[80vh] md:max-h-[40vh] sm:max-h-[40vh]  custom-scrollbar"
                  : "h-full flex flex-col overflow-y-auto max-h-[40vh] lg:max-h-[80vh] md:max-h-[40vh] sm:max-h-[40vh]  custom-scrollbar"
              }`}
            >
              <div className="sticky top-0 bg-[var(--home-card)] z-1 p-4 border-b flex items-center justify-between">
                <h2 className="text-[15px] font-semibold z-1">
                  Comments ( {localCommentCount} )
                </h2>
                {/* Show close button only when in expanded view (md and up) AND hasPhotos */}
                {hasPhotos && (
                  <DialogClose asChild className="hidden lg:block">
                    <button
                      className="text-muted-foreground hover:text-foreground p-1"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </DialogClose>
                )}
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <PostComments post={post} refetchKey={refetchKey} />
              </div>
              <div className="sticky p-4 flex flex-col gap-2 bg-[var(--home-card)] z-10">
                <div className="relative w-full">
                  <div className="flex items-center">
                    <img
                      className="mr-3 w-10 h-10 rounded-full"
                      src={user?.user?.profile_photo}
                      alt=""
                    />
                    <Input
                      type="text"
                      className="text-sm p-4 flex-1"
                      placeholder="Add a comment"
                      ref={textareaRef}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      className="cursor-pointer ml-3"
                      onClick={() => setShowEmojiPicker((prev) => !prev)}
                    >
                      <SmilePlus className="mr-1" />
                    </Button>
                    <Button
                      onClick={handleComment}
                      variant="outline"
                      className="ml-3"
                    >
                      <Send />
                    </Button>
                  </div>

                  {showEmojiPicker && (
                    <div
                      ref={emojiPickerRef}
                      className="fixed bottom-19 z-[200] right-10 "
                    >
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        theme={resolvedTheme === "dark" ? "dark" : "light"}
                      />
                    </div>
                  )}
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const isNotAuthenticated = () => {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={`bg-[var(--home-card)] p-0 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
            hasPhotos
              ? "max-w-[95vw] lg:max-w-[85vw] xl:max-w-[1100px] 2xl:max-w-[1200px]"
              : "max-w-[95vw] sm:max-w-[500px]"
          }`}
        >
          <div
            className={`flex transition-all duration-300 ease-in-out ${
              hasPhotos ? "flex-col lg:flex-row" : "flex-col"
            } max-h-[90vh]`}
          >
            {/* Left side: post content */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                hasPhotos
                  ? "w-full flex flex-col overflow-y-hidden lg:overflow-y-auto lg:w-1/2 "
                  : "max-h-[50vh] overflow-y-auto border-b"
              } p-4`}
            >
              <PostTopNav post={post} />
              <PostCaptions post={post} />
              {hasPhotos && (
                <div className="flex-1 min-h-0 mt-3">
                  {" "}
                  {/* Added 'flex' here */}
                  <PostPhotos post={post} isModal={true} />
                </div>
              )}
            </div>

            {/* Right side: comments */}
            <DialogDescription
              className={`transition-all duration-300 ease-in-out ${
                hasPhotos
                  ? "md:border-l w-full lg:w-1/2 flex flex-col overflow-y-auto max-h-[40vh] lg:max-h-[80vh] md:max-h-[40vh] sm:max-h-[40vh]  custom-scrollbar"
                  : "h-full flex flex-col overflow-y-auto max-h-[40vh] lg:max-h-[80vh] md:max-h-[40vh] sm:max-h-[40vh]  custom-scrollbar"
              }`}
            >
              <div className="sticky top-0 bg-[var(--home-card)] z-1 p-4 border-b flex items-center justify-between">
                <h2 className="text-[15px] font-semibold z-1">
                  Comments ( {localCommentCount} )
                </h2>
                {/* Show close button only when in expanded view (md and up) AND hasPhotos */}
                {hasPhotos && (
                  <DialogClose asChild className="hidden lg:block">
                    <button
                      className="text-muted-foreground hover:text-foreground p-1"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </DialogClose>
                )}
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <PostComments post={post} refetchKey={refetchKey} />
              </div>
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const authenticated = () => {
    if (user) {
      return isAuthenticated();
    } else {
      return isNotAuthenticated();
    }
  };

  return authenticated();
};

export default CommentModal;
