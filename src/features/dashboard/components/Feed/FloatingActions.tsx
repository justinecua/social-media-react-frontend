import { getStoredUser } from "@/utils/auth";
import CreatePostDialog from "../modal/CreatePostDialog";
import { Loader2, LogOut, MessageCircleMore, Pencil, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useLogoutMutation } from "@/redux/services/auth/auth";
import { Link, useNavigate } from "react-router-dom";

const FloatingActions = ({ refetchPosts }) => {
  const dialogRef = useRef();
  const user = getStoredUser();
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const user = localStorage.getItem("user");
    const userString = JSON.parse(user);

    const refreshToken = userString.tokens?.refresh;

    if (refreshToken) {
      try {
        const response = await logout({ refresh: refreshToken }).unwrap();
        console.log("Logout successful:", response);
        localStorage.removeItem("user");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      console.warn("No refresh token found in localStorage.");
    }
  };

  if (!user) return null;

  return (
    <>
      <CreatePostDialog ref={dialogRef} onPostCreated={refetchPosts} />

      <div className="xl:hidden lg:flex fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
        <div className="relative group">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`p-3 sm:p-4 bg-[var(--home-card)] cursor-pointer hover:bg-[var(--button-hover-bg-color)] rounded-full shadow-xl transition-transform duration-300 group-hover:rotate-90  ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Floating Actions */}
          {isOpen && (
            <div
              className={`absolute bottom-full right-0 mb-2 flex flex-col items-center gap-2 
                transition-all duration-300
                opacity-100 visible translate-y-0`}
            >
              <button
                className="p-3 sm:p-4 bg-[var(--home-card)] cursor-pointer hover:bg-[var(--button-hover-bg-color)] rounded-full shadow-xl"
                onClick={() => dialogRef.current?.open()}
              >
                <Pencil className="w-5 h-5" />
              </button>

              <button className="p-3 sm:p-4 bg-[var(--home-card)] cursor-pointer hover:bg-[var(--button-hover-bg-color)] rounded-full shadow-xl">
                <MessageCircleMore className="w-5 h-5" />
              </button>

              <button
                className="p-3 sm:p-4 bg-[var(--home-card)] cursor-pointer hover:bg-[var(--button-hover-bg-color)] rounded-full shadow-xl flex items-center justify-center"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
              </button>

              <Link to={`/profile/${user?.user?.account_id}`}>
                <button className="cursor-pointer">
                  <img
                    src={user?.user?.profile_photo}
                    alt="profile"
                    className="w-10 h-10 rounded-full mr-2 hover:bg-[var(--button-hover-bg-color)]"
                  />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FloatingActions;
