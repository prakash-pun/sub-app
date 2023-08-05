/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import party from "party-js";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/controllers";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const { toast } = useToast();
  const [data, setData] = useState({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const ref: any = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { data: _data, error } = await registerUser(data);
    if (_data?.length) {
      setData({ username: "", email: "" });
      party.confetti(ref?.current, {
        count: party.variation.range(40, 50),
      });
      localStorage.setItem("user", JSON.stringify(_data[0]));
      navigate("/dashboard");
    }
    if (error?.code === "23505") {
      toast({
        variant: "destructive",
        description: error.message || "There was a problem with your request.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <Link
        to="/examples/authentication"
        className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
      >
        Login
      </Link>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex items-center justify-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Aanay Inc
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <div className={cn("grid gap-6")}>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="username">
                    Username
                  </Label>
                  <Input
                    required
                    id="username"
                    placeholder="username"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="username"
                    maxLength={20}
                    autoCorrect="off"
                    value={data.username || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        username: e.target.value?.trim()?.toLowerCase(),
                      })
                    }
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    required
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={data.email || ""}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <Button ref={ref} disabled={isLoading} type="submit">
                  {isLoading ? "Loading..." : "Sign In with Email"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <p className="px-8 pt-4 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export { Register };
