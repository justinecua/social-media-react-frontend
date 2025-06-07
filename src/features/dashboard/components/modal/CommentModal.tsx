// CommentModal.jsx
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
import { DialogTitle } from "@radix-ui/react-dialog";

const CommentModal = ({ open, onClose, post }) => {
  const hasPhotos = post?.photos?.length > 0;
  const commentCount = post?.comment_count;

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
                ? "w-full flex flex-col overflow-y-hidden lg:overflow-y-hidden lg:w-1/2 max-h-[50vh] sm:max-h-[50vh] lg:max-h-none"
                : "max-h-[50vh] overflow-y-auto border-b"
            } p-4`}
          >
            <PostTopNav post={post} />
            <PostCaptions post={post} />
            {hasPhotos && <PostPhotos post={post} />}
          </div>

          {/* Right side: comments */}
          <DialogDescription
            className={`transition-all duration-300 ease-in-out ${
              hasPhotos
                ? "md:border-l lg:h-[80vh] w-full lg:w-1/2 flex flex-col overflow-y-auto custom-scrollbar"
                : "h-[50vh] flex flex-col"
            }`}
          >
            <div className="sticky top-0 bg-[var(--home-card)] z-10 p-4 border-b flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">
                Comments ( {commentCount} )
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
              <PostComments post={post} />
            </div>
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
