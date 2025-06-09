import { Button } from "@/components/ui/button";
import { useGetNewUsersQuery } from "@/redux/services/accounts/accounts";
import NoProfile from "../../../assets/images/No-Profile.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import SkeletonRightNav from "./Skeleton/skeletonRighNav";
import { getStoredUser } from "@/utils/auth";

const RightNav = () => {
  const { data: newUsers, isFetching } = useGetNewUsersQuery();
  const [imgErrors, setImgErrors] = useState({});
  const user = getStoredUser();

  const setImgError = (index) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  if (isFetching) {
    return (
      <Card className="Left bg-[var(--home-card)] w-xs h-full hidden xl:block fixed right-0 rounded-none">
        <CardContent>
          <SkeletonRightNav />
        </CardContent>
      </Card>
    );
  }

  const isAuthenticated = () => {
    return (
      <Card className="Left bg-[var(--home-card)] w-xs h-full hidden xl:block fixed right-0 rounded-none">
        <CardContent>
          <div>Login</div>
        </CardContent>
      </Card>
    );
  };

  const isNotAuthenticated = () => {
    return (
      <Card className="Left bg-[var(--home-card)] w-xs h-full hidden xl:block fixed right-0 rounded-none">
        <CardContent>
          <div className="flex flex-col">
            <span className="text-lg font-bold">First time here? 👋</span>
            <span className="text-sm text-[var(--color-subtitle)] leading-4.5">
              Sign up right now to create your own profile and join the
              community
            </span>
          </div>
          <Link to="/login">
            <Button className="w-full mt-4 p-5.5 bg-[var(--button-bg-color)] text-[var(--button-text-color)] hover:bg-[var(--button-hover-bg-color)] cursor-pointer">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="w-full mt-2 p-5.5 bg-[var(--button-bg-color)] text-[var(--button-text-color)] hover:bg-[var(--button-hover-bg-color)] cursor-pointer">
              Create Account
            </Button>
          </Link>
          <div className="mt-6 mb-4 text-sm">
            <span>New On Glow</span>

            <div className="mt-4 w-full">
              {newUsers && newUsers.length > 0 ? (
                <div className="grid grid-cols-5 gap-4">
                  {newUsers.map((user, index) => (
                    <Link to={`/profile/${user?.id}`} key={index}>
                      <div className="flex justify-center">
                        <img
                          src={
                            imgErrors[index] || !user?.profile_photo
                              ? NoProfile
                              : user.profile_photo
                          }
                          alt={user?.username}
                          className="w-9 h-9 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform duration-200"
                          onError={() => setImgError(index)}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--color-subtitle)]">
                  No new users found.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
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

export default RightNav;
