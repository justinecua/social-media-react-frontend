import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import PostTopNav from "../Feed/PostTopNav";
import PostCaptions from "../Feed/PostCaptions";
import PostPhotos from "../Feed/PostPhotos";
import PostComments from "../Feed/PostComments";
import { useState } from "react";

const CommentModal = ({ open, onClose, post }) => {
  const hasPhotos = post?.photos?.length > 0;
  const commentCount = post?.comment_count;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={`bg-[var(--home-card)] p-0 rounded-lg overflow-hidden ${
          hasPhotos
            ? "max-w-[95vw] lg:max-w-[85vw] xl:max-w-[1100px] 2xl:max-w-[1200px]"
            : "max-w-[95vw] sm:max-w-[500px]"
        }`}
      >
        <div
          className={`flex ${
            hasPhotos ? "flex-col md:flex-row" : "flex-col"
          } max-h-[90vh]`}
        >
          {/* Left side: post content */}
          <div
            className={`${
              hasPhotos
                ? "md:max-h-[80vh] md:overflow-y-auto md:w-[55%] lg:w-[60%]"
                : "max-h-[50vh] overflow-y-auto border-b"
            } p-4`}
          >
            <PostTopNav post={post} />
            <PostCaptions post={post} />
            {hasPhotos && <PostPhotos post={post} />}
          </div>

          {/* Right side: comments */}
          <DialogDescription
            className={`${
              hasPhotos
                ? "md:border-l md:h-[60vh] md:w-[50%] lg:w-[45%] flex flex-col"
                : "h-[50vh] flex flex-col"
            }`}
          >
            <div className="sticky top-0 bg-[var(--home-card)] z-10 p-4 border-b flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">
                Comments ({commentCount})
              </h2>
              {hasPhotos && (
                <DialogClose asChild>
                  <button
                    className="text-muted-foreground hover:text-foreground p-1"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </DialogClose>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <PostComments post={post} />
            </div>
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
