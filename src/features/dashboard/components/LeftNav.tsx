import { ModeToggle } from "@/components/themes/mode-toggle";
import {
  House,
  Telescope,
  Search,
  SquarePlus,
  LogOut,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getStoredUser } from "@/utils/auth";
import { Card, CardContent } from "@/components/ui/card";
import CreatePostDialog from "./modal/CreatePostDialog";
import { useRef } from "react";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/services/auth/auth";

const LeftNav = () => {
  const user = getStoredUser();
  const [logout, { isLoading }] = useLogoutMutation();
  const dialogRef = useRef();
  const navigate = useNavigate();

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

  const isNotAuthenticated = () => {
    return (
      <Card className="Left bg-[var(--home-card)] w-xs h-full flex flex-col justify-between fixed rounded-none">
        <CardContent>
          <div className="flex flex-col justify-between h-38">
            <div className="w-[50px] h-[50px] mb-1 flex items-center mb-3">
              <span className="text-[var(--title-color)] text-xl title-font">
                glow
              </span>
            </div>
            <Link to="/">
              <div className=" flex w-full items-center w-full p-2 rounded-md  hover:bg-[var(--button-hover-bg-color)] hover:text-[var(--button-text-color)] dark:hover:text-white cursor-pointer">
                {" "}
                <Button variant="outline" size="icon" className="mr-3">
                  <House className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <span className="text-sm">Home</span>
              </div>
            </Link>

            <div className=" flex w-full items-center w-full p-2 rounded-md   hover:text-[var(--button-text-color)] dark:hover:text-white ">
              {" "}
            </div>

            {/* <Link to="/explore">
              <div className=" flex w-full items-center w-full p-2 rounded-md  hover:bg-[var(--button-hover-bg-color)] hover:text-[var(--button-text-color)] dark:hover:text-white cursor-pointer">
                {" "}
                <Button variant="outline" size="icon" className="mr-3">
                  <Telescope className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <span className="text-sm">Explore</span>
              </div>
            </Link> */}
          </div>
        </CardContent>
        <div className="pl-8">
          <ModeToggle />
        </div>
      </Card>
    );
  };

  const isAuthenticated = () => {
    return (
      <>
        <CreatePostDialog ref={dialogRef} />
        <div className="Left bg-[var(--home-card)] p-7 w-xs h-full flex flex-col justify-between fixed">
          <div className="flex flex-col justify-between h-38">
            <div className="w-[50px] h-[50px] mb-1 flex items-center">
              <span className="text-[var(--title-color)] text-xl title-font">
                glow
              </span>
            </div>

            <div className="mt-3">
              <Link to="/">
                <div className=" flex w-full items-center w-full p-2 rounded-md  hover:bg-[var(--button-hover-bg-color)] hover:text-[var(--button-text-color)] dark:hover:text-white cursor-pointer">
                  {" "}
                  <Button variant="outline" size="icon" className="mr-3">
                    <House className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                  <span className="text-sm">Home</span>
                </div>
              </Link>

              {/* <Link to="/explore">
                <div className=" flex w-full items-center w-full p-2 rounded-md  hover:bg-[var(--button-hover-bg-color)] hover:text-[var(--button-text-color)] dark:hover:text-white cursor-pointer">
                  {" "}
                  <Button variant="outline" size="icon" className="mr-3">
                    <Telescope className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                  <span className="text-sm">Explore</span>
                </div>
              </Link> */}

              <div
                onClick={() => dialogRef.current?.open()}
                className=" flex w-full items-center w-full p-2 rounded-md  hover:bg-[var(--button-hover-bg-color)] hover:text-[var(--button-text-color)] dark:hover:text-white cursor-pointer"
              >
                <Button variant="outline" size="icon" className="mr-3">
                  <SquarePlus />
                </Button>
                <span className="text-sm">Create </span>
              </div>

              <div
                onClick={handleLogout}
                className=" flex w-full items-center w-full p-2 rounded-md  hover:bg-[var(--button-hover-bg-color)] hover:text-[var(--button-text-color)] dark:hover:text-white cursor-pointer"
              >
                <Button variant="outline" size="icon" className="mr-3">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                </Button>
                <span className="text-sm">Logout </span>
              </div>
            </div>
          </div>

          <div>
            <ModeToggle />
          </div>
        </div>
      </>
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

export default LeftNav;
