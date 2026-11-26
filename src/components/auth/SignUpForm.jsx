"use client";

import Link from "next/link";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  //              State management
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //              Form submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image");
    const data = Object.fromEntries(formData.entries());

    delete data.image;

    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile && imageFile.size > 0) {
        if (!imageFile.type.startsWith("image/")) {
          toast.error("Please choose an image file.");
          return;
        }

        if (imageFile.size > 5 * 1024 * 1024) {
          toast.error("Image must be 5 MB or less.");
          return;
        }

        imageUrl = await uploadImage(imageFile);
      }

      const { data: user, error } = await authClient.signUp.email({
        ...data,
        ...(imageUrl ? { image: imageUrl } : {}),
      });

      if (error) {
        toast.error(error?.message || "Sign up failed!");
        return;
      }

      toast.success(user?.message || "Sign up successful!");
      router.push("/");
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
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
            Create your account
          </h1>

          <p className="text-sm leading-6 text-muted-foreground">
            Join MentorLagbe and find the right learning opportunity.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="h-11"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-11"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-11 pr-11"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>

            <Select name="role" defaultValue="student">
              <SelectTrigger id="role" className="h-11 w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="tutor">Tutor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Profile Image (optional)</Label>

            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="h-11 cursor-pointer"
            />

            <p className="text-xs text-muted-foreground">
              JPG, PNG or WebP. Max 5 MB.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full bg-primary font-medium text-primary-foreground hover:bg-primary-dark cursor-pointer"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Sign In */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-primary transition-colors hover:text-[#0f4d42]"
          >
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
