import { BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const RecentTuitions = ({ tuitions = [] }) => {
  const recent = tuitions.slice(0, 6).map((tuition) => ({
    title: tuition.title || "Untitled tuition",
    location: tuition.location || "Dhaka",
    mode: tuition.mode || "Offline",
    monthlyFee: Number(tuition.monthlyFee || 0),
    status: tuition.approvalStatus,
  }));

  return (
    <Card className="border-border bg-card shadow-sm lg:col-span-2">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">
              Recent Tuitions
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your latest tuition posts.
            </p>
          </div>

          <Link
            href={"/dashboard/tutor/my-tuitions"}
            className="hidden cursor-pointer items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-dark sm:flex"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 space-y-3">
          {recent.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
              No recent tuitions yet.
            </p>
          ) : (
            recent.map((tuition) => (
              <div
                key={tuition.title}
                className="flex items-center justify-between gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-primary/5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {tuition.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {tuition.location} · {tuition.mode} · ৳
                      {tuition.monthlyFee.toLocaleString("en-BD")}/month
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">
                  {tuition.status === "approved" ? "Approved" : "Pending"}
                </span>
              </div>
            ))
          )}
        </div>

        <button className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-border py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 sm:hidden">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
};

export default RecentTuitions;
