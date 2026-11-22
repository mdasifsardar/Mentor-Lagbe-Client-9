"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MoreHorizontal,
  Phone,
  UserRound,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Applicants = () => {
  const applications = [];

  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock3,
      className: "border-amber-200 bg-amber-50 text-amber-700",
    },
    accepted: {
      label: "Accepted",
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
        <div className="mb-7">
          <p className="mb-1 text-sm font-semibold text-primary">
            Tutor Dashboard
          </p>

          <h1 className="font-heading text-2xl font-bold tracking-tight text-[#17211F] sm:text-3xl">
            Applicants
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66736F]">
            Review students who have applied to your tuition posts and manage
            their application status.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-7 grid gap-4 sm:grid-cols-3">
          <Card className="border-[#E2E8E5] bg-white shadow-none">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#66736F]">
                Total Applicants
              </p>

              <p className="mt-2 text-2xl font-bold text-[#17211F]">3</p>
            </CardContent>
          </Card>

          <Card className="border-[#E2E8E5] bg-white shadow-none">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#66736F]">
                Pending Review
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-600">1</p>
            </CardContent>
          </Card>

          <Card className="border-[#E2E8E5] bg-white shadow-none">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#66736F]">
                Accepted
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">1</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="mb-5 border-[#E2E8E5] bg-white shadow-none">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#17211F]">
                  Application Requests
                </p>

                <p className="mt-1 text-xs text-[#66736F]">
                  Review and respond to your students.
                </p>
              </div>

              <select
                className="h-10 w-full rounded-md border border-[#DDE4E1] bg-white px-3 text-sm text-[#17211F] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-64"
                defaultValue="all"
              >
                <option value="all">All Tuitions</option>
                <option value="physics">Physics — HSC First Year</option>
                <option value="math">Advanced Mathematics</option>
                <option value="english">English Grammar & IELTS</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Applicant Cards */}
        <div className="space-y-5">
          {applications.map((application) => {
            const status = statusConfig[application.status];

            const StatusIcon = status.icon;

            return (
              <Card
                key={application.id}
                className="border-[#E2E8E5] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardHeader className="border-b border-[#E8ECE9] p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    {/* Student */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserRound className="h-5 w-5" />
                      </div>

                      <div>
                        <CardTitle className="text-base font-bold text-[#17211F] sm:text-lg">
                          {application.studentName}
                        </CardTitle>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#66736F]">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            {application.studentEmail}
                          </span>

                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />
                            {application.studentPhone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <Badge
                      variant="outline"
                      className={`w-fit gap-1.5 px-3 py-1.5 ${status.className}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-5 sm:p-6">
                  {/* Tuition Info */}
                  <div className="mb-5 rounded-xl border border-[#E8ECE9] bg-[#FAFBFA] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                          Applied Tuition
                        </p>

                        <h2 className="mt-1 text-sm font-bold leading-6 text-[#17211F]">
                          {application.tuitionTitle}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <Badge className="border-0 bg-primary/10 text-primary hover:bg-primary/10">
                            {application.subject}
                          </Badge>

                          <span className="text-xs text-[#66736F]">
                            ৳{application.monthlyFee.toLocaleString()}
                            /month
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#66736F]">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Applied {application.appliedAt}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                        Preferred Schedule
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#17211F]">
                        {application.preferredSchedule}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                        Student Note
                      </p>

                      <p className="mt-1 text-sm leading-6 text-[#66736F]">
                        {application.studentNote}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex flex-col gap-3 border-t border-[#E8ECE9] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#88928F]">
                      Review this application and update the student&apos;s
                      status.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {application.status === "pending" && (
                        <>
                          <Button className="h-9 gap-2 bg-primary font-semibold text-primary-foreground hover:bg-primary-dark">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Accept
                          </Button>

                          <Button
                            variant="outline"
                            className="h-9 gap-2 border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Reject
                          </Button>
                        </>
                      )}

                      {application.status === "accepted" && (
                        <Button
                          variant="outline"
                          className="h-9 gap-2 border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                      )}

                      {application.status === "rejected" && (
                        <Button
                          variant="outline"
                          className="h-9 gap-2 border-primary/30 text-primary hover:bg-primary/5"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Accept
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-[#66736F] hover:bg-[#F1F4F2] hover:text-[#17211F]"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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

export default Applicants;
