"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Pencil, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { updateTutionData } from "@/lib/actions/tutor/tutor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EditTuitionDialog = ({ tuition }) => {
  //
  const [open, setOpen] = useState(false);
  const [imgPreview, setImgPreview] = useState(tuition.bannerImage || "");
  const router = useRouter();

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);

      const imageFile = formData.get("bannerImage");

      const tuitionData = Object.fromEntries(formData.entries());

      // Remove file object
      delete tuitionData.bannerImage;

      // New image selected হলে শুধু তখন ImgBB upload হবে
      if (imageFile instanceof File && imageFile.size > 0) {
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
          toast.error(imgResult?.error?.message || "Image upload failed!");
          return;
        }

        // New image URL
        tuitionData.bannerImage = imgResult.data.url;
      } else {
        // New image না দিলে পুরোনো image থাকবে
        tuitionData.bannerImage = tuition.bannerImage;
      }

      tuitionData.monthlyFee = Number(tuitionData.monthlyFee);
      tuitionData.daysPerWeek = Number(tuitionData.daysPerWeek);

      const res = await updateTutionData({
        id: tuition._id,
        ...tuitionData,
      });

      if (!res.success) {
        toast.error(res?.error || res?.message || "Failed to update tuition!");
        return;
      }

      toast.success(res?.message || "Tuition updated successfully!");

      setImgPreview(tuitionData.bannerImage);
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-9 gap-2 border-[#DDE4E1] bg-white text-[#17211F] hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer"
          />
        }
      >
        <Pencil className="h-4 w-4" />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#17211F]">
            Edit Tuition
          </DialogTitle>

          <DialogDescription>Update your tuition details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdatePost} className="mt-4 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Tuition Title</Label>

            <Input
              id="title"
              name="title"
              defaultValue={tuition.title}
              placeholder="Enter tuition title"
            />
          </div>

          {/* Subject + Class Level */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>

              <Input
                id="subject"
                name="subject"
                defaultValue={tuition.subject}
                placeholder="Enter subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classLevel">Class Level</Label>

              <Input
                id="classLevel"
                name="classLevel"
                defaultValue={tuition.classLevel}
                placeholder="Enter class level"
              />
            </div>
          </div>

          {/* Mode + Location */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mode">Mode</Label>

              <Input
                id="mode"
                name="mode"
                defaultValue={tuition.mode}
                placeholder="Online / Offline"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>

              <Input
                id="location"
                name="location"
                defaultValue={tuition.location}
                placeholder="Enter location"
              />
            </div>
          </div>

          {/* Monthly Fee + Days */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="monthlyFee">Monthly Fee</Label>

              <Input
                id="monthlyFee"
                name="monthlyFee"
                type="number"
                defaultValue={tuition.monthlyFee}
                placeholder="Enter monthly fee"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daysPerWeek">Days Per Week</Label>

              <Input
                id="daysPerWeek"
                name="daysPerWeek"
                type="number"
                defaultValue={tuition.daysPerWeek}
                placeholder="Enter days per week"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <textarea
              id="description"
              name="description"
              defaultValue={tuition.description}
              placeholder="Enter tuition description"
              className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Banner Image */}
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

            {/* Only ONE file input */}
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

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancel
            </Button>

            <Button
              type="submit"
              className="cursor-pointer bg-[#C89B5A] text-white hover:bg-[#B88A49]"
            >
              Update Tuition
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTuitionDialog;
