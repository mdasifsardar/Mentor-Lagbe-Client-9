import { BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const RecentTuitions = () => {
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

          <button className="hidden items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-dark sm:flex">
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-primary/5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  Mathematics for Class 10
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Dhaka · Offline · ৳5,000/month
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">
              Approved
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-primary/5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  English Grammar & Writing
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Online · 3 Days/Week · ৳4,000/month
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600">
              Pending
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-primary/5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  Physics for HSC
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Chattogram · Offline · ৳6,000/month
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">
              Approved
            </span>
          </div>
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-border py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 sm:hidden">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
};

export default RecentTuitions;
