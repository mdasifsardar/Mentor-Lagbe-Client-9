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
import { updateApplicationStatus } from "@/lib/actions/tutor/tutor";
import { toast } from "sonner";

const formatAppliedAt = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-BD");
};

const Applicants = ({ applications }) => {
  // ---------------- Summary
  const totalApplicants = applications.length;

  const pendingApplicants = applications.filter(
    (application) => application.status === "pending",
  ).length;

  const acceptedApplicants = applications.filter(
    (application) => application.status === "accepted",
  ).length;

  const handleAcceptReject = async (id, status) => {
    try {
      const res = await updateApplicationStatus(id, status);

      toast.success(res?.message || `Application ${status} successfully`);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
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
            Review students who have applied to your tuition posts.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-7 grid gap-4 sm:grid-cols-3">
          {/* Total */}
          <Card className="border-[#E2E8E5] bg-white shadow-none">
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-[#66736F]">
                Total Applicants
              </p>

              <p className="mt-2 text-2xl font-bold text-[#17211F]">
                {totalApplicants}
              </p>
            </CardContent>
          </Card>

          {/* Pending */}
          <Card className="border-[#E2E8E5] bg-white shadow-none">
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-[#66736F]">
                Pending Review
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-600">
                {pendingApplicants}
              </p>
            </CardContent>
          </Card>

          {/* Accepted */}
          <Card className="border-[#E2E8E5] bg-white shadow-none">
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-[#66736F]">Accepted</p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {acceptedApplicants}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Applicants */}
        {applications.length === 0 ? (
          <Card className="border-[#E2E8E5] bg-white shadow-none">
            <CardContent className="p-10 text-center">
              <UserRound className="mx-auto h-10 w-10 text-gray-400" />

              <h2 className="mt-3 text-base font-bold text-[#17211F]">
                No applicants found
              </h2>

              <p className="mt-1 text-sm text-[#66736F]">
                No students have applied to your tuition posts yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            {applications.map((application) => (
              <Card
                key={application._id}
                className="border-[#E2E8E5] bg-white shadow-sm"
              >
                {/* Student Information */}
                <CardHeader className="border-b border-[#E8ECE9] p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserRound className="h-5 w-5" />
                      </div>

                      <div>
                        <CardTitle className="text-base font-bold text-[#17211F] sm:text-lg">
                          {application.studentName}
                        </CardTitle>

                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#66736F]">
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
                    {application.status === "pending" && (
                      <Badge className="w-fit gap-1.5 bg-amber-50 text-amber-700">
                        <Clock3 className="h-3.5 w-3.5" />
                        Pending
                      </Badge>
                    )}

                    {application.status === "accepted" && (
                      <Badge className="w-fit gap-1.5 bg-emerald-50 text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Accepted
                      </Badge>
                    )}

                    {application.status === "rejected" && (
                      <Badge className="w-fit gap-1.5 bg-red-50 text-red-700">
                        <XCircle className="h-3.5 w-3.5" />
                        Rejected
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-5 sm:p-6">
                  {/* Tuition Information */}
                  <div className="mb-5 rounded-xl border border-[#E8ECE9] bg-[#FAFBFA] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                      Applied Tuition
                    </p>

                    <h2 className="mt-1 text-sm font-bold text-[#17211F]">
                      {application.tuitionTitle}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge className="bg-primary/10 text-primary">
                        {application.subject}
                      </Badge>

                      <span className="text-xs text-[#66736F]">
                        ৳{Number(application.monthlyFee || 0).toLocaleString()}
                        /month
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[#66736F]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Applied {formatAppliedAt(application.appliedAt)}
                    </div>
                  </div>

                  {/* Student Details */}
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
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-[#E8ECE9] pt-5">
                    {application.status === "pending" && (
                      <>
                        <Button
                          onClick={() =>
                            handleAcceptReject(application._id, "accepted")
                          }
                          className="h-9 gap-2 bg-primary"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Accept
                        </Button>

                        <Button
                          onClick={() =>
                            handleAcceptReject(application._id, "rejected")
                          }
                          variant="outline"
                          className="h-9 gap-2 border-red-200 text-red-600"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                      </>
                    )}

                    {application.status === "accepted" && (
                      <Button
                        onClick={() =>
                          handleAcceptReject(application._id, "rejected")
                        }
                        variant="outline"
                        className="h-9 gap-2 border-red-200 text-red-600"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    )}

                    {application.status === "rejected" && (
                      <Button
                        onClick={() =>
                          handleAcceptReject(application._id, "accepted")
                        }
                        variant="outline"
                        className="h-9 gap-2 border-primary/30 text-primary"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Accept
                      </Button>
                    )}

                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Applicants;
