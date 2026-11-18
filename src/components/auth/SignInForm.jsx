"use client";

import Link from "next/link";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  //              State management
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  //              Sign in management
  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const { data: user, error } = await authClient.signIn.email({
        ...data,
      });

      if (error) {
        toast.error(error?.message || "Sign in failed!");
        return;
      }

      toast.success(user?.message || "Sign in successful!");
      router.push("/");
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    }
  };

  return (
    <Card className="w-full border-border bg-card shadow-sm">
      <CardHeader className="space-y-5 pb-6 text-center">
        {/* Logo */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
          <GraduationCap className="h-6 w-6 text-primary-foreground" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back
          </h1>

          <p className="text-sm leading-6 text-muted-foreground">
            Sign in to continue to your MentorLagbe account.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-11"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary transition-colors hover:text-[#0f4d42]"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-11 pr-11"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="h-11 w-full bg-primary font-medium text-primary-foreground hover:bg-[#0f4d42]"
          >
            Sign In
          </Button>
        </form>

        {/* Sign Up */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary transition-colors hover:text-[#0f4d42]"
          >
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
