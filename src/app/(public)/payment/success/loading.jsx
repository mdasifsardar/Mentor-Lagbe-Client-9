import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F7F8F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <Skeleton className="mx-auto h-14 w-14 rounded-full bg-[#F1F4F2]" />
          <Skeleton className="mx-auto mt-5 h-3 w-32 bg-[#F1F4F2]" />
          <Skeleton className="mx-auto mt-3 h-9 w-72 max-w-full bg-[#F1F4F2]" />
          <Skeleton className="mx-auto mt-4 h-4 w-full max-w-md bg-[#F1F4F2]" />
          <Skeleton className="mx-auto mt-2 h-4 w-4/5 max-w-sm bg-[#F1F4F2]" />
        </div>

        <Card className="mt-8 gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
          <CardHeader className="border-b border-[#E8ECE9] p-5 sm:p-6">
            <Skeleton className="h-6 w-40 bg-[#F1F4F2]" />
          </CardHeader>

          <CardContent className="space-y-3 p-5 sm:p-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-lg bg-[#FAFBFA] px-3 py-2.5"
              >
                <Skeleton className="h-4 w-24 bg-[#F1F4F2]" />
                <Skeleton className="h-4 w-32 bg-[#F1F4F2]" />
              </div>
            ))}

            <div className="mt-4 border-t border-[#E8ECE9] pt-4">
              <Skeleton className="h-3 w-32 bg-[#F1F4F2]" />
              <Skeleton className="mt-2 h-9 w-full rounded-lg bg-[#F1F4F2]" />
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center">
          <Skeleton className="h-11 w-full rounded-lg bg-[#F1F4F2] sm:w-44" />
        </div>
      </div>
    </section>
  );
}
