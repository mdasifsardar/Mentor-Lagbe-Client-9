"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteApplication } from "@/lib/actions/student/student";
import { formatDate } from "@/lib/format";

const STATUS_BADGES = {
  pending: {
    label: "Pending",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-50 text-red-700",
  },
};

const MyApplications = ({ applications = [], tutorNames = new Map() }) => {
  const [list, setList] = useState(applications);
  const [deletingId, setDeletingId] = useState(null);

  const handleCancel = async (applicationId) => {
    setDeletingId(applicationId);

    try {
      const result = await deleteApplication(applicationId);

      toast.success(result.message || "Application cancelled successfully.");

      setList((current) =>
        current.filter((application) => application._id !== applicationId),
      );
    } catch (error) {
      toast.error(error.message || "Failed to cancel application.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="border-[#E2E8E5] bg-white shadow-sm">
      <CardHeader className="border-b border-[#E8ECE9] p-5 sm:p-6">
        <CardTitle className="text-base font-bold text-[#17211F] sm:text-lg">
          My Applications
        </CardTitle>

        <p className="mt-1 text-sm text-[#66736F]">
          Track the tuitions you have applied for and their current status.
        </p>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#E2E8E5] bg-[#FAFBFA] p-10 text-center">
            <UserRound className="mx-auto h-10 w-10 text-gray-400" />

            <p className="mt-3 text-sm text-[#66736F]">
              You haven&apos;t applied for any tuition yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#E8ECE9]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#E8ECE9] bg-[#FAFBFA]">
                  <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                    Tuition Title
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                    Tutor Name &amp; Email
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                    Monthly Fee
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                    Applied Date
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                    Status
                  </th>
                  <th className="px-4 py-3.5"></th>
                </tr>
              </thead>

              <tbody>
                {list.map((application) => {
                  const statusBadge = STATUS_BADGES[application.status] || {
                    label: application.status || "Pending",
                    icon: Clock3,
                    className: "bg-amber-50 text-amber-700",
                  };

                  const StatusIcon = statusBadge.icon;

                  const tutorName =
                    tutorNames.get(application.tutorEmail) ||
                    application.tutorEmail;

                  return (
                    <tr
                      key={application._id}
                      className="border-b border-[#E8ECE9] transition-colors last:border-0 hover:bg-primary/5"
                    >
                      <td className="px-4 py-4 font-semibold text-[#17211F]">
                        {application.tuitionTitle}
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-medium text-[#17211F]">
                          {tutorName}
                        </p>

                        <p className="mt-0.5 text-xs text-[#66736F]">
                          {application.tutorEmail}
                        </p>
                      </td>

                      <td className="px-4 py-4 font-bold text-primary">
                        ৳{application.monthlyFee}
                      </td>

                      <td className="px-4 py-4 text-[#66736F]">
                        {formatDate(application.appliedAt)}
                      </td>

                      <td className="px-4 py-4">
                        <Badge
                          className={`w-fit gap-1.5 ${statusBadge.className}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusBadge.label}
                        </Badge>
                      </td>

                      <td className="px-4 py-4 text-right">
                        {application.status === "pending" && (
                          <Button
                            variant="outline"
                            className="h-9 gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                            disabled={deletingId === application._id}
                            onClick={() => handleCancel(application._id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyApplications;
