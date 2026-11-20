"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postTution } from "@/lib/actions/tutor/tutor";
import { error } from "better-auth/api";
import { BookOpen, ImagePlus, RotateCcw, Send, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const PostTuitionForm = () => {
  //              State management
  const [imgPreview, setImgPreview] = useState("");

  //
  const handlePostTution = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      const imageFile = formData.get("bannerImage");

      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,

        {
          method: "POST",
          body: imageFormData,
        },
      );
      const imgResult = await imgRes.json();

      if (!imgRes.ok || !imgResult.success) {
        toast.error(imgRes?.error?.message || "Image upload failed!");
        return;
      }

      //              Tution data

      const tuitionData = Object.fromEntries(formData.entries());

      delete tuitionData.bannerImage;
      tuitionData.bannerImage = imgResult.data.url;
      tuitionData.monthlyFee = Number(tuitionData.monthlyFee);
      tuitionData.daysPerWeek = Number(tuitionData.daysPerWeek);

      const res = await postTution(tuitionData);

      if (!res.success) {
        toast.error(res?.error || res?.message || "Failed to add tution!");
        return;
      }

      toast.success(res?.message || "Tuition posted successfully!");
      form.reset();
      setImgPreview("");
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <Card className="border-border bg-card shadow-sm">
      {/* Card Header */}
      <CardHeader className="border-b border-border p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-5 w-5" />
          </div>

          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Post a New Tuition
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Share your tuition requirements and connect with the right
              students through MentorLagbe.
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Form */}
      <CardContent className="p-5 sm:p-6">
        <form onSubmit={handlePostTution} className="space-y-7">
          {/* Basic Information */}
          <div>
            <div className="mb-4">
              <h2 className="font-heading text-sm font-bold text-foreground">
                Basic Information
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Tell students about the tuition you are offering.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Title */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">
                  Tuition Title <span className="text-red-500">*</span>
                </Label>

                <Input
                  required
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Mathematics for Class 10"
                  className="h-11"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>

                <Input
                  required
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Mathematics"
                  className="h-11"
                />
              </div>

              {/* Class Level */}
              <div className="space-y-2">
                <Label htmlFor="classLevel">
                  Class Level <span className="text-red-500">*</span>
                </Label>

                <Select name="classLevel">
                  <SelectTrigger id="classLevel" className="h-11 w-full">
                    <SelectValue placeholder="Select class level" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="class-6">Class 6</SelectItem>
                    <SelectItem value="class-7">Class 7</SelectItem>
                    <SelectItem value="class-8">Class 8</SelectItem>
                    <SelectItem value="class-9">Class 9</SelectItem>
                    <SelectItem value="class-10">Class 10</SelectItem>
                    <SelectItem value="ssc">SSC</SelectItem>
                    <SelectItem value="class-11">Class 11</SelectItem>
                    <SelectItem value="class-12">Class 12</SelectItem>
                    <SelectItem value="hsc">HSC</SelectItem>
                    <SelectItem value="admission">Admission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Tuition Details */}
          <div className="border-t border-border pt-7">
            <div className="mb-4">
              <h2 className="font-heading text-sm font-bold text-foreground">
                Tuition Details
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Set the schedule, mode and payment details for your tuition.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Mode */}
              <div className="space-y-2">
                <Label htmlFor="mode">
                  Mode <span className="text-red-500">*</span>
                </Label>

                <Select name="mode">
                  <SelectTrigger id="mode" className="h-11 w-full">
                    <SelectValue placeholder="Select tuition mode" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </Label>

                <Input
                  required
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="h-11"
                />
              </div>

              {/* Monthly Fee */}
              <div className="space-y-2">
                <Label htmlFor="monthlyFee">
                  Monthly Fee <span className="text-red-500">*</span>
                </Label>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                    ৳
                  </span>

                  <Input
                    required
                    id="monthlyFee"
                    name="monthlyFee"
                    type="number"
                    min="0"
                    placeholder="500"
                    className="h-11 pl-8"
                  />
                </div>
              </div>

              {/* Days Per Week */}
              <div className="space-y-2">
                <Label htmlFor="daysPerWeek">
                  Days Per Week <span className="text-red-500">*</span>
                </Label>

                <Select name="daysPerWeek">
                  <SelectTrigger id="daysPerWeek" className="h-11 w-full">
                    <SelectValue placeholder="Select days per week" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="2">2 Days</SelectItem>
                    <SelectItem value="3">3 Days</SelectItem>
                    <SelectItem value="4">4 Days</SelectItem>
                    <SelectItem value="5">5 Days</SelectItem>
                    <SelectItem value="6">6 Days</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-border pt-7">
            <div className="mb-4">
              <h2 className="font-heading text-sm font-bold text-foreground">
                Tuition Description
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Provide additional information about your tuition.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>

              <Textarea
                id="description"
                name="description"
                placeholder="Describe the tuition, teaching approach, preferred student profile, schedule details, and other relevant information..."
                className="min-h-32 resize-none"
              />
            </div>
          </div>

          {/* Banner Image */}
          <div className="border-t border-border pt-7">
            <div className="mb-4">
              <h2 className="font-heading text-sm font-bold text-foreground">
                Tuition Banner
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Upload a banner image that represents your tuition.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bannerImage">
                Banner Image <span className="text-red-500">*</span>
              </Label>

              <label
                htmlFor="bannerImage"
                className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-primary/5 px-5 py-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/10"
              >
                {imgPreview ? (
                  <div className="relative h-40 w-full">
                    <Image
                      src={imgPreview}
                      alt="Banner preview"
                      fill
                      className="rounded-lg object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ImagePlus className="h-5 w-5" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-foreground">
                      Click to upload banner image
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      PNG, JPG or JPEG
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-primary">
                      <Upload className="h-3.5 w-3.5" />
                      Choose Image
                    </div>
                  </>
                )}
              </label>

              <Input
                id="bannerImage"
                name="bannerImage"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setImgPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Button
              type="submit"
              className="h-11 cursor-pointer bg-primary font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md"
            >
              <Send className="mr-2 h-4 w-4" />
              Post Tuition
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostTuitionForm;
