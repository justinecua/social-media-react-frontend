import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getStoredUser } from "@/utils/auth";
import {
  Plus,
  Pencil,
  MessageCircleMore,
  SmilePlus,
  Image,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/themes/theme-provider";

const FloatingActions = () => {
  const user = getStoredUser();
  const { resolvedTheme } = useTheme();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [images, setImages] = useState([]);

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    setText((prevText) => {
      const newText = prevText.slice(0, start) + emoji + prevText.slice(end);
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
      }, 0);
      return newText;
    });
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

  const isAuthenticated = () => {
    return (
      <div className="xl:hidden lg:flex fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
        <Dialog>
          <div className="relative group">
            {/* Main Floating Button */}
            <button className="p-3 sm:p-4 bg-[var(--home-card)] cursor-pointer hover:bg-[var(--button-hover-bg-color)] rounded-full shadow-xl transition-transform duration-300 group-hover:rotate-90">
              <Plus className="w-5 h-5" />
            </button>

            {/* Floating Action Options */}
            <div
              className="absolute bottom-full right-0 mb-2 flex flex-col items-center gap-2
              opacity-0 invisible translate-y-4
              group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
              transition-all duration-300"
            >
              <DialogTrigger asChild>
                <button className="p-3 sm:p-4 bg-[var(--home-card)] cursor-pointer hover:bg-[var(--button-hover-bg-color)] rounded-full shadow-xl">
                  <Pencil className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <button className="p-3 sm:p-4 bg-[var(--home-card)] cursor-pointer hover:bg-[var(--button-hover-bg-color)] rounded-full shadow-xl">
                <MessageCircleMore className="w-5 h-5" />
              </button>
            </div>
          </div>

          <DialogContent
            className="w-[95%] sm:w-[500px] max-w-[95vw]"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <h2 className="text-lg font-bold border-b p-2">Create Post</h2>
            <div className="flex items-center">
              <img
                src={user?.user?.profile_photo}
                alt=""
                className="w-10 h-10 rounded-full mr-2"
              />
              <p className="text-sm">{user?.user?.username}</p>
            </div>

            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What do you have in mind today, ${user?.user?.username}?`}
              className="w-full h-36 resize-none bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none rounded-md text-white placeholder:text-gray-400"
            />

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="flex gap-3 mt-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative min-w-[6rem] h-24 flex-shrink-0"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="object-cover w-full h-full rounded-md"
                    />
                    <button
                      onClick={() =>
                        setImages((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Emoji and Post Buttons */}
            <div className="flex flex-wrap justify-between items-center mt-3 gap-2 relative">
              {/* Emoji Picker */}
              <div ref={emojiPickerRef} className="relative">
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 sm:left-70 mb-8 z-5">
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      theme={resolvedTheme === "dark" ? "dark" : "light"}
                    />
                  </div>
                )}
              </div>
              {/* Buttons */}
              <div className="flex gap-2 justify-end flex-wrap sm:flex-nowrap w-full sm:w-auto">
                {/* Upload Images Button */}
                <Button
                  asChild
                  className="cursor-pointer hover:bg-[var(--button-hover-bg-color)] p-4 sm:p-4 bg-[var(--home-card)] text-[var(--button-text-color)] w-full sm:w-[38%] rounded-md"
                >
                  <label className="flex items-center text-sm cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setImages((prev) => [...prev, ...files]);
                      }}
                    />
                    <Image className="mr-1" /> Image
                  </label>
                </Button>

                {/* Emoji Button */}
                <Button
                  className="cursor-pointer hover:bg-[var(--button-hover-bg-color)] p-4 sm:p-4 bg-[var(--home-card)] text-[var(--button-text-color)] w-full sm:w-[38%] rounded-md flex items-center"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                >
                  <SmilePlus className="mr-1" /> Emoji
                </Button>

                {/* Post Button */}
                <Button className="cursor-pointer hover:bg-[var(--button-hover-bg-color)] p-4 sm:p-4 bg-[var(--home-card)] text-[var(--button-text-color)] w-full sm:w-[50%] rounded-md">
                  Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const authenticated = () => {
    if (user) {
      return isAuthenticated();
    }
  };

  return authenticated();
};

export default FloatingActions;
