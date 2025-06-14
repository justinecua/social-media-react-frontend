// src/components/CreatePostDialog.jsx
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import { SmilePlus, Image } from "lucide-react";
import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useTheme } from "@/components/themes/theme-provider";
import { getStoredUser } from "@/utils/auth";
import { useCreatePostMutation } from "@/redux/services/posts/posts";
import { toast } from "sonner";

const CreatePostDialog = forwardRef(({ onPostCreated }, ref) => {
  const user = getStoredUser();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleSubmit = async () => {
    if (!text.trim() && images.length === 0) return;

    try {
      const base64Images = await Promise.all(
        images.map((img) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                name: img.name,
                origurl: reader.result,
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(img);
          });
        })
      );

      const payload = {
        accID: user?.user?.account_id,
        audience: 1,
        caption: text,
        photos: base64Images,
        taglist: [],
      };

      const response = await createPost(payload).unwrap();
      toast("Post created successfully!");

      setText("");
      setImages([]);
      setOpen(false);
      onPostCreated?.(response);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Failed to create post:", err);
      toast.error("Failed to create post. Please try again.");
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          className="w-full h-36 resize-none bg-transparent border-none outline-none focus:outline-none shadow-none rounded-md text-white placeholder:text-gray-400"
        />

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

        <div className="flex flex-wrap justify-between items-center mt-3 gap-2 relative">
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

          <div className="flex gap-2 justify-end flex-wrap sm:flex-nowrap w-full sm:w-auto">
            <Button
              asChild
              className="cursor-pointer hover:bg-[var(--button-hover-bg-color)] p-4 bg-[var(--home-card)] text-[var(--button-text-color)] w-full sm:w-[38%] rounded-md"
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

            <Button
              className="cursor-pointer hover:bg-[var(--button-hover-bg-color)] p-4 bg-[var(--home-card)] text-[var(--button-text-color)] w-full sm:w-[38%] rounded-md flex items-center"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <SmilePlus className="mr-1" /> Emoji
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="cursor-pointer hover:bg-[var(--button-hover-bg-color)] p-4 bg-[var(--home-card)] text-[var(--button-text-color)] w-full sm:w-[50%] rounded-md flex items-center"
            >
              {isLoading ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default CreatePostDialog;
