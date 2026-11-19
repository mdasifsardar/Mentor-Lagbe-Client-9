import { Users, Crown, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const QuickOverview = () => {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="p-5 sm:p-6">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Quick Overview
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            A quick look at your tutoring activity.
          </p>
        </div>

        <div className="mt-5 space-y-4">
          <div className="rounded-xl bg-primary/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Approval Rate
              </span>

              <span className="text-sm font-bold text-primary">75%</span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary/10">
              <div className="h-full w-[75%] rounded-full bg-primary" />
            </div>
          </div>

          <div className="rounded-xl border border-[#D9A441]/20 bg-[#D9A441]/10 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D9A441]/15">
                <Crown className="h-4 w-4 text-[#D9A441]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Free Plan
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Up to 2 active tuition posts.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  24 Applicants
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Applications received across your tuitions.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  6 Approved Tuitions
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Your currently approved tuition posts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickOverview;
