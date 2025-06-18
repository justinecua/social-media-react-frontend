import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import glow from "../../../assets/images/glow.png";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { useLoginMutation } from "../../../redux/services/auth/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setUser } from "../../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast("Please fill in both username and password");
      return;
    }

    try {
      const res = await login({ username, password }).unwrap();
      console.log("Login successful:", res);
      localStorage.setItem("user", JSON.stringify(res));
      navigate("/");

      dispatch(setUser(res));
    } catch (err) {
      const message =
        err?.data?.detail || "Something went wrong. Please try again";
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col h-full w-full relative">
      <Card className="w-full max-w-sm bg-[var(--home-card)]">
        <Link to="/" className="w-full">
          <div className="relative flex items-center justify-center -mb-5">
            <img src={glow} className="w-16 h-16" alt="" />
          </div>
        </Link>
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-[var(--title-color)]">
            Welcome Back!
          </CardTitle>

          <CardDescription className="-mt-2">
            Glad to see you again!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Input
                  id="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="text-sm p-4"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  className="text-sm  p-4 -mt-3"
                />
              </div>
            </div>

            {/* Move button here */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--button-color-bg)] text-white p-5 mt-3 hover:bg-[var(--button-hover-bg-color)] hover:text-[var(--button-text-color)] dark:hover:text-white cursor-pointer"
            >
              Login
            </Button>
            <Link to="/register" className="w-full">
              <Button
                variant="outline"
                className="mt-3 w-full p-5 bg-[var(--button-hover-bg-color)] cursor-pointer"
              >
                Create Account
              </Button>
            </Link>
          </form>
        </CardContent>

        <div className="w-full flex justify-center px-6 -mt-1">
          <Link to="/forgotpassword" className="text-center w-full">
            <span className="w-full text-sm"> Forgot your password?</span>
          </Link>
        </div>
      </Card>

      <div className="absolute bottom-4 left-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default LoginPage;
