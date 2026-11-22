"use client";

import {
  Camera,
  CheckCircle2,
  Edit3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const user = {
    name: "",
    email: "",
    role: "",
    phone: "",
    location: "",
    bio: "",
    plan: "",
    joined: "",
  };

  return (
    <section className="min-h-screen bg-[#F7F8F5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-7">
          <p className="mb-1 text-sm font-semibold text-primary">
            Account Settings
          </p>

          <h1 className="font-heading text-2xl font-bold tracking-tight text-[#17211F] sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66736F]">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6 overflow-hidden border-[#E2E8E5] bg-white shadow-sm">
          <div className="h-28 bg-gradient-to-r from-[#0F4D42] via-[#176B5B] to-[#2A806E]" />

          <CardContent className="-mt-14 px-5 pb-6 sm:px-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              {/* Avatar + Info */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#E8F0ED] text-primary shadow-md">
                    <UserRound className="h-12 w-12" />
                  </div>

                  <button
                    type="button"
                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-sm transition hover:bg-primary-dark"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-[#17211F]">
                      {user.name}
                    </h2>

                    <Badge className="border-0 bg-primary/10 text-primary hover:bg-primary/10">
                      {user.role}
                    </Badge>
                  </div>

                  <p className="mt-1 text-sm text-[#66736F]">{user.email}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="h-10 gap-2 border-[#DDE4E1] bg-white text-[#17211F] hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Personal Information */}
          <Card className="border-[#E2E8E5] bg-white shadow-sm">
            <CardHeader className="p-5 sm:p-6">
              <CardTitle className="text-lg font-bold text-[#17211F]">
                Personal Information
              </CardTitle>

              <p className="text-sm text-[#66736F]">
                Your basic profile information.
              </p>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-5 p-5 sm:p-6">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#17211F]"
                >
                  Full Name
                </Label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#88928F]" />

                  <Input
                    id="name"
                    value={user.name}
                    readOnly
                    className="h-11 border-[#DDE4E1] bg-[#FAFBFA] pl-10 text-[#17211F]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#17211F]"
                >
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#88928F]" />

                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="h-11 border-[#DDE4E1] bg-[#FAFBFA] pl-10 text-[#17211F]"
                  />
                </div>
              </div>

              {/* Phone + Location */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-[#17211F]"
                  >
                    Phone Number
                  </Label>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#88928F]" />

                    <Input
                      id="phone"
                      value={user.phone}
                      readOnly
                      className="h-11 border-[#DDE4E1] bg-[#FAFBFA] pl-10 text-[#17211F]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-semibold text-[#17211F]"
                  >
                    Location
                  </Label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#88928F]" />

                    <Input
                      id="location"
                      value={user.location}
                      readOnly
                      className="h-11 border-[#DDE4E1] bg-[#FAFBFA] pl-10 text-[#17211F]"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-sm font-semibold text-[#17211F]"
                >
                  Bio
                </Label>

                <Textarea
                  id="bio"
                  value={user.bio}
                  readOnly
                  className="min-h-28 resize-none border-[#DDE4E1] bg-[#FAFBFA] text-sm leading-6 text-[#17211F]"
                />
              </div>

              {/* Save */}
              <div className="flex justify-end border-t border-[#E8ECE9] pt-5">
                <Button className="h-10 bg-primary font-semibold text-primary-foreground hover:bg-primary-dark">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Overview */}
          <div className="space-y-6">
            <Card className="border-[#E2E8E5] bg-white shadow-sm">
              <CardHeader className="p-5 sm:p-6">
                <CardTitle className="text-lg font-bold text-[#17211F]">
                  Account Overview
                </CardTitle>
              </CardHeader>

              <Separator />

              <CardContent className="space-y-5 p-5 sm:p-6">
                {/* Role */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#88928F]">
                      Account Role
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#17211F]">
                      {user.role}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>

                <Separator />

                {/* Plan */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#88928F]">
                      Current Plan
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#17211F]">
                      {user.plan}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className="border-[#E2E8E5] bg-[#FAFBFA] text-[#66736F]"
                  >
                    {user.plan} Plan
                  </Badge>
                </div>

                <Separator />

                {/* Joined */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#88928F]">
                    Member Since
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#17211F]">
                    {user.joined}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Verification */}
            <Card className="border-emerald-200 bg-emerald-50/60 shadow-none">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Account Verified
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-700">
                      Your email address has been successfully verified.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-[#E2E8E5] bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#17211F]">
                      Account Security
                    </p>

                    <p className="mt-1 text-xs text-[#66736F]">
                      Keep your account secure.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="h-9 border-[#DDE4E1] text-xs font-semibold hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  >
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
