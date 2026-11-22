"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  Clock,
  GraduationCap,
  MapPin,
  Wallet,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { applyForTuition } from "@/lib/actions/student/student";
import { formatClassLevel } from "@/lib/format";

const TuitionDetails = ({ tuition, user }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentPhone: "",
    preferredSchedule: "",
    studentNote: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "student") {
      toast.error("Only students can apply for tuition.");
      return;
    }

    if (!formData.studentPhone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!formData.preferredSchedule.trim()) {
      toast.error("Please enter your preferred schedule.");
      return;
    }

    const applicationData = {
      tuitionId: String(tuition._id),
      studentName: user.name,
      studentEmail: user.email,
      studentPhone: formData.studentPhone,
      preferredSchedule: formData.preferredSchedule,
      studentNote: formData.studentNote,
    };

    try {
      setLoading(true);

      const result = await applyForTuition(applicationData);

      toast.success(result.message || "Application submitted successfully!");

      setOpen(false);

      setFormData({
        studentPhone: "",
        preferredSchedule: "",
        studentNote: "",
      });
    } catch (error) {
      toast.error(error.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Banner */}
      {tuition.bannerImage && (
        <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-[#FAF6EF] sm:h-72">
          <Image
            src={tuition.bannerImage}
            alt={tuition.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="rounded-2xl bg-[#1E3A34] p-6 text-white sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#C89B5A] px-4 py-1 text-sm font-semibold text-[#12352C]">
            {tuition.subject}
          </span>

          <span className="rounded-full bg-white/10 px-4 py-1 text-sm">
            {formatClassLevel(tuition.classLevel)}
          </span>
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">{tuition.title}</h1>

        <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/80">
          <span className="flex items-center gap-2">
            <MapPin size={17} />
            {tuition.location}
          </span>

          <span className="flex items-center gap-2">
            <Wallet size={17} />৳{tuition.monthlyFee}/month
          </span>
        </div>
      </div>

      {/* Tuition Information */}
      <div className="grid gap-6 md:grid-cols-3">
        <InfoItem
          icon={<BookOpen size={20} />}
          label="Subject"
          value={tuition.subject}
        />

        <InfoItem
          icon={<GraduationCap size={20} />}
          label="Class Level"
          value={formatClassLevel(tuition.classLevel)}
        />

        <InfoItem
          icon={<MapPin size={20} />}
          label="Tuition Mode"
          value={tuition.mode}
        />

        <InfoItem
          icon={<CalendarDays size={20} />}
          label="Days Per Week"
          value={`${tuition.daysPerWeek} days`}
        />

        <InfoItem
          icon={<Clock size={20} />}
          label="Preferred Location"
          value={tuition.location}
        />

        <InfoItem
          icon={<Wallet size={20} />}
          label="Monthly Fee"
          value={`৳${tuition.monthlyFee}`}
        />
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-[#1E3A34]">
          Tuition Description
        </h2>

        <p className="whitespace-pre-line leading-7 text-gray-600">
          {tuition.description || "No description provided."}
        </p>
      </div>

      {/* Tutor Information */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="mb-5 text-xl font-bold text-[#1E3A34]">
          Tutor Information
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#E8F1EC] text-[#1E3A34]">
            <UserRound size={24} />
          </div>

          <div>
            <p className="font-semibold text-[#1E3A34]">
              {tuition.tutorName || "Tutor"}
            </p>

            <p className="text-sm text-gray-500">{tuition.tutorEmail}</p>
          </div>
        </div>
      </div>

      {/* Apply Section */}
      <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#FAF6EF] p-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-500">Monthly Fee</p>

          <h2 className="text-3xl font-bold text-[#1E3A34]">
            ৳{tuition.monthlyFee}
            <span className="text-base font-normal text-gray-500">/month</span>
          </h2>
        </div>

        {user?.role === "student" ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <Button className="bg-[#176B5B] text-white hover:bg-[#125447]" />
              }
            >
              Apply for Tuition
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-[#1E3A34]">
                  Apply for Tuition
                </DialogTitle>

                <DialogDescription>
                  Fill in the information below to submit your application.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleApply} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>

                  <Input
                    name="studentPhone"
                    value={formData.studentPhone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Preferred Schedule
                  </label>

                  <Input
                    name="preferredSchedule"
                    value={formData.preferredSchedule}
                    onChange={handleChange}
                    placeholder="e.g. 5 PM - 7 PM"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Note</label>

                  <Textarea
                    name="studentNote"
                    value={formData.studentNote}
                    onChange={handleChange}
                    placeholder="Write something about yourself..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#176B5B] text-white hover:bg-[#125447]"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        ) : user ? (
          <p className="text-sm font-medium text-gray-600">
            Only students can apply for tuition.
          </p>
        ) : (
          <Button
            render={<Link href="/signin" />}
            nativeButton={false}
            className="bg-[#176B5B] text-white hover:bg-[#125447]"
          >
            Login to Apply
          </Button>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
      <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#E8F1EC] text-[#1E3A34]">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-1 font-semibold text-[#1E3A34]">
        {value || "Not specified"}
      </p>
    </div>
  );
};

export default TuitionDetails;
