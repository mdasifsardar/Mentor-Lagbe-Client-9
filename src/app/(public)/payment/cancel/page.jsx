import Link from "next/link";
import { ArrowLeft, CreditCard, RotateCcw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CancelPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F7F8F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/25">
            <X className="h-7 w-7" />
          </span>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Payment cancelled
          </p>

          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#17211F] sm:text-4xl">
            No charges were made
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#66736F] sm:text-base">
            You stopped the checkout before completing the payment. Your
            account keeps its current plan and nothing has been charged.
          </p>
        </div>

        <Card className="mt-8 gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
          <CardHeader className="border-b border-[#E8ECE9] p-5 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-[#17211F] sm:text-lg">
              <CreditCard className="h-5 w-5 text-primary" />
              Checkout status
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 sm:p-6">
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between gap-4 rounded-lg bg-[#FAFBFA] px-3 py-2.5">
                <span className="text-[#66736F]">Status</span>

                <span className="flex items-center gap-1.5 font-semibold text-primary">
                  <X className="h-4 w-4" />
                  Cancelled
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-3 py-2.5">
                <span className="shrink-0 text-[#66736F]">Charged amount</span>

                <span className="font-semibold text-[#17211F]">$0.00</span>
              </div>

              <div className="flex items-center justify-between gap-4 px-3 py-2.5">
                <span className="shrink-0 text-[#66736F]">Your plan</span>

                <span className="font-semibold text-[#17211F]">Unchanged</span>
              </div>
            </div>

            <p className="mt-4 border-t border-[#E8ECE9] pt-4 text-xs leading-5 text-[#88928F]">
              If you still want to upgrade, you can start a new checkout at any
              time.
            </p>
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/payment">
            <Button className="h-11 w-full cursor-pointer bg-primary px-6 font-semibold text-primary-foreground hover:bg-[#2b8a76] sm:w-auto">
              <RotateCcw className="h-4 w-4" />
              Try again
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="h-11 w-full cursor-pointer border-[#E2E8E5] px-6 font-semibold text-[#17211F] hover:bg-[#F1F4F2] sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
