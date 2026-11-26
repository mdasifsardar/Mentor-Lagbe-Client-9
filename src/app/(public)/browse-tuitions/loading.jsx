import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TuitionCardSkeleton = () => (
  <Card className="gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
    <Skeleton className="h-44 w-full rounded-none bg-[#F1F4F2]" />

    <CardContent className="space-y-3 p-5">
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-full bg-[#F1F4F2]" />
        <Skeleton className="h-6 w-16 rounded-full bg-[#F1F4F2]" />
      </div>

      <Skeleton className="h-6 w-4/5 bg-[#F1F4F2]" />
      <Skeleton className="h-4 w-2/5 bg-[#F1F4F2]" />
      <Skeleton className="h-4 w-full bg-[#F1F4F2]" />
      <Skeleton className="h-4 w-5/6 bg-[#F1F4F2]" />

      <div className="flex items-center justify-between border-t border-[#E8ECE9] pt-4">
        <Skeleton className="h-7 w-24 bg-[#F1F4F2]" />
        <Skeleton className="h-9 w-28 rounded-lg bg-[#F1F4F2]" />
      </div>
    </CardContent>
  </Card>
);

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <Skeleton className="h-8 w-72 max-w-full bg-[#F1F4F2] sm:h-9" />
        <Skeleton className="mt-3 h-4 w-80 max-w-full bg-[#F1F4F2]" />

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-11 w-full rounded-lg bg-[#F1F4F2] sm:flex-1" />
          <Skeleton className="h-11 w-full rounded-lg bg-[#F1F4F2] sm:w-44" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <TuitionCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
