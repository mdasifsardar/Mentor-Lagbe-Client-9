import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentApplications = ({ applications = [] }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg">Recent Applications</CardTitle>

        <Button variant="outline" size="sm">
          <Link href="/dashboard/student/my-applications">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen size={26} />
            </div>

            <h3 className="font-semibold">No Applications Yet</h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              You haven&apos;t applied for any tuition yet. Explore available
              tuitions and apply to get started.
            </p>

            <Button className="mt-5">
              <Link href="/tuitions">Explore Tuitions</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application._id}
                className="flex flex-col justify-between gap-3 rounded-xl border p-4 sm:flex-row sm:items-center"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold">{application.tuitionTitle}</h3>

                  <p className="text-sm text-muted-foreground">
                    Subject: {application.subject}
                  </p>

                  <p className="break-all text-sm text-muted-foreground">
                    Tutor: {application.tutorEmail}
                  </p>

                  <p className="text-sm font-medium">
                    Monthly Fee: ৳{application.monthlyFee}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <Badge
                    variant={
                      application.status === "accepted"
                        ? "default"
                        : application.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {application.status}
                  </Badge>

                  <p className="text-xs text-muted-foreground">
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentApplications;
