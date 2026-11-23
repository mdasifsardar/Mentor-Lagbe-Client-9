"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteApplication } from "@/lib/actions/student/student";
import { formatDate } from "@/lib/format";

const STATUS_BADGES = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  accepted: { label: "Accepted", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-700" },
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
    <Card>
      <CardHeader>
        <CardTitle>My Applications</CardTitle>
      </CardHeader>

      <CardContent>
        {list.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">
            You haven&apos;t applied for any tuition yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[#1E3A34]/10">
                <tr className="text-[#17211F]">
                  <th className="py-3 pr-4 font-semibold">Tuition Title</th>
                  <th className="py-3 pr-4 font-semibold">
                    Tutor Name &amp; Email
                  </th>
                  <th className="py-3 pr-4 font-semibold">Monthly Fee</th>
                  <th className="py-3 pr-4 font-semibold">Applied Date</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 font-semibold"></th>
                </tr>
              </thead>

              <tbody>
                {list.map((application) => {
                  const statusBadge = STATUS_BADGES[application.status] || {
                    label: application.status || "Pending",
                    className: "bg-amber-50 text-amber-700",
                  };

                  const tutorName =
                    tutorNames.get(application.tutorEmail) ||
                    application.tutorEmail;

                  return (
                    <tr
                      key={application._id}
                      className="border-b border-[#1E3A34]/10 last:border-0"
                    >
                      <td className="py-4 pr-4 font-semibold text-[#1E3A34]">
                        {application.tuitionTitle}
                      </td>

                      <td className="py-4 pr-4">
                        <p className="font-medium text-[#17211F]">
                          {tutorName}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {application.tutorEmail}
                        </p>
                      </td>

                      <td className="py-4 pr-4 font-semibold text-[#1E3A34]">
                        ৳{application.monthlyFee}
                      </td>

                      <td className="py-4 pr-4 text-muted-foreground">
                        {formatDate(application.appliedAt)}
                      </td>

                      <td className="py-4 pr-4">
                        <Badge
                          variant="outline"
                          className={`capitalize ${statusBadge.className}`}
                        >
                          {statusBadge.label}
                        </Badge>
                      </td>

                      <td className="py-4 text-right">
                        {application.status === "pending" && (
                          <Button
                            variant="ghost"
                            className="gap-2 text-destructive hover:bg-destructive/10"
                            disabled={deletingId === application._id}
                            onClick={() => handleCancel(application._id)}
                          >
                            <Trash2 className="h-4 w-4" />
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
