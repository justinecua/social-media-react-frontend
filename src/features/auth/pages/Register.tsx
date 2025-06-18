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
import { Link } from "react-router-dom";

const RegisterPage = () => {
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
            Create Account
          </CardTitle>
          <CardDescription className="-mt-1 leading-tight text-sm">
            Join endless chats and connections <br /> Glow is your place to vibe
            with friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Input
                  id="username"
                  type="username"
                  placeholder="Username"
                  required
                  className="text-sm p-4"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="emai"
                  placeholder="Your Valid Email"
                  className="text-sm  p-4 -mt-3"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a 6+ digit password"
                  className="text-sm  p-4 -mt-3"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your Password"
                  className="text-sm  p-4 -mt-3"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full bg-[var(--button-color-bg)] text-white p-4 -mt-3 hover:bg-[var(--button-hover-bg-color)] hover:text-[var(--button-text-color)] dark:hover:text-white cursor-pointer"
          >
            Register
          </Button>
          <Link to="/login" className="w-full">
            <Button variant="outline" className="cursor-pointer w-full p-4">
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="absolute bottom-4 left-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default RegisterPage;
