import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const InfoSkeleton = () => (
  <div className="rounded-2xl border border-[#E2E8E5] bg-white p-5">
    <Skeleton className="h-5 w-5 rounded-lg bg-[#F1F4F2]" />
    <Skeleton className="mt-4 h-3 w-20 bg-[#F1F4F2]" />
    <Skeleton className="mt-2 h-5 w-28 bg-[#F1F4F2]" />
  </div>
);

export default function Loading() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mb-6 max-w-5xl">
        <Skeleton className="h-4 w-32 bg-[#F1F4F2]" />
      </div>

      <div className="mx-auto max-w-5xl space-y-8">
        <Skeleton className="h-52 w-full rounded-2xl bg-[#F1F4F2] sm:h-72" />

        <div className="rounded-2xl bg-[#1E3A34] p-6 sm:p-8">
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-7 w-20 rounded-full bg-white/20" />
            <Skeleton className="h-7 w-24 rounded-full bg-white/10" />
          </div>

          <Skeleton className="mt-5 h-8 w-3/4 bg-white/20" />

          <div className="mt-5 flex flex-wrap gap-5">
            <Skeleton className="h-4 w-28 bg-white/10" />
            <Skeleton className="h-4 w-32 bg-white/10" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <InfoSkeleton key={index} />
          ))}
        </div>

        <Card className="gap-0 rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
          <CardContent className="space-y-3 p-6">
            <Skeleton className="h-6 w-48 bg-[#F1F4F2]" />
            <Skeleton className="h-4 w-full bg-[#F1F4F2]" />
            <Skeleton className="h-4 w-5/6 bg-[#F1F4F2]" />
            <Skeleton className="h-4 w-2/3 bg-[#F1F4F2]" />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5 rounded-2xl bg-[#FAF6EF] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-[#F1F4F2]" />
            <Skeleton className="h-8 w-32 bg-[#F1F4F2]" />
          </div>

          <Skeleton className="h-11 w-full rounded-lg bg-[#F1F4F2] sm:w-44" />
        </div>
      </div>
    </section>
  );
}
