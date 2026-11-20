"use client";

import {
  CheckCircle2,
  Clock3,
  Edit3,
  MoreHorizontal,
  Power,
  Trash2,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const MyTuitions = () => {
  const stats = [
    {
      label: "Total Tuitions",
      value: 3,
      valueClass: "text-[#17211F]",
    },
    {
      label: "Approved",
      value: 1,
      valueClass: "text-emerald-600",
    },
    {
      label: "Pending",
      value: 1,
      valueClass: "text-amber-600",
    },
    {
      label: "Active",
      value: 2,
      valueClass: "text-primary",
    },
  ];

  const tuitions = [
    {
      id: 1,
      title: "Concept-Based Physics Sessions for HSC First Year",
      subject: "Physics",
      classLevel: "Class 11",
      mode: "Online",
      location: "Uttara, Dhaka",
      monthlyFee: 4500,
      daysPerWeek: 3,
      approvalStatus: "pending",
      isActive: true,
      image: "https://i.ibb.co/sv10wqjM/2301078-250x186.webp",
    },
    {
      id: 2,
      title: "Advanced Mathematics for HSC Students",
      subject: "Mathematics",
      classLevel: "Class 11",
      mode: "Offline",
      location: "Mirpur, Dhaka",
      monthlyFee: 5000,
      daysPerWeek: 4,
      approvalStatus: "approved",
      isActive: true,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "English Grammar & IELTS Foundation",
      subject: "English",
      classLevel: "Class 12",
      mode: "Online",
      location: "Online",
      monthlyFee: 3500,
      daysPerWeek: 3,
      approvalStatus: "rejected",
      isActive: false,
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const approvalConfig = {
    pending: {
      label: "Pending",
      icon: Clock3,
      className: "border-amber-200 bg-amber-50 text-amber-700",
    },
    approved: {
      label: "Approved",
      icon: CheckCircle2,
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "border-red-200 bg-red-50 text-red-700",
    },
  };

  return (
    <section className="min-h-screen bg-[#F7F8F5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold text-primary">
              Tutor Dashboard
            </p>

            <h1 className="font-heading text-2xl font-bold tracking-tight text-[#17211F] sm:text-3xl">
              My Tuitions
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66736F]">
              Manage your tuition posts, check approval status, and control
              whether your listings are currently active.
            </p>
          </div>

          <Link href={"/dashboard/tutor/post-tuition"}>
            <Button className="h-10 bg-primary font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md cursor-pointer">
              + Post New Tuition
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border-[#E2E8E5] bg-white shadow-none"
            >
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#66736F]">
                  {stat.label}
                </p>

                <p className={`mt-2 text-2xl font-bold ${stat.valueClass}`}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tuition Cards */}
        <div className="space-y-5">
          {tuitions.map((tuition) => {
            const approval = approvalConfig[tuition.approvalStatus];

            const ApprovalIcon = approval.icon;

            return (
              <Card
                key={tuition.id}
                className="overflow-hidden border-[#E2E8E5] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className=" relative h-56 w-full shrink-0 bg-[#F1F4F2] lg:h-auto lg:w-64">
                      <Image
                        src={tuition.image}
                        alt={tuition.title}
                        fill
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 sm:p-6">
                      <div className="flex flex-col gap-4">
                        {/* Title + Status */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge className="border-0 bg-primary/10 text-primary hover:bg-primary/10">
                                {tuition.subject}
                              </Badge>

                              <Badge
                                variant="outline"
                                className="border-[#E2E8E5] text-[#66736F]"
                              >
                                {tuition.classLevel}
                              </Badge>
                            </div>

                            <h2 className="max-w-2xl text-lg font-bold leading-7 text-[#17211F] sm:text-xl">
                              {tuition.title}
                            </h2>
                          </div>

                          <Badge
                            variant="outline"
                            className={`w-fit gap-1.5 px-3 py-1.5 ${approval.className}`}
                          >
                            <ApprovalIcon className="h-3.5 w-3.5" />
                            {approval.label}
                          </Badge>
                        </div>

                        {/* Tuition Info */}
                        <div className="grid gap-3 rounded-xl border border-[#E8ECE9] bg-[#FAFBFA] p-4 sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                              Mode
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#17211F]">
                              {tuition.mode}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                              Location
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#17211F]">
                              {tuition.location}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                              Monthly Fee
                            </p>

                            <p className="mt-1 text-sm font-bold text-primary">
                              ৳{tuition.monthlyFee.toLocaleString()}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                              Days / Week
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#17211F]">
                              {tuition.daysPerWeek} Days
                            </p>
                          </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex flex-col gap-4 border-t border-[#E8ECE9] pt-4 sm:flex-row sm:items-center sm:justify-between">
                          {/* Active Status */}
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                tuition.isActive
                                  ? "bg-emerald-500"
                                  : "bg-gray-400"
                              }`}
                            />

                            <span className="text-sm font-semibold text-[#17211F]">
                              {tuition.isActive ? "Active" : "Closed"}
                            </span>

                            <span className="text-xs text-[#88928F]">•</span>

                            <span className="text-xs text-[#66736F]">
                              {tuition.isActive
                                ? "Visible when approved"
                                : "Currently closed"}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center gap-2">
                            <Button
                              variant="outline"
                              className="h-9 gap-2 border-[#DDE4E1] bg-white text-[#17211F] hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              Edit
                            </Button>

                            <Button
                              variant="outline"
                              className="h-9 gap-2 border-[#DDE4E1] bg-white text-[#17211F] hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer"
                            >
                              <Power className="h-3.5 w-3.5" />

                              {tuition.isActive ? "Close" : "Activate"}
                            </Button>

                            <Button
                              variant="outline"
                              className="h-9 gap-2 border-red-200 bg-white text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-[#66736F] hover:bg-[#F1F4F2] hover:text-[#17211F]"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MyTuitions;
