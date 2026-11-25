import { checkoutVerify } from "@/lib/actions/payment/payment";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CreditCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const { status, customer_email, metadata, payment_intent, payment_status } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete" && payment_status === "paid") {
    console.log(
      status,
      customer_email,
      "Meta data =>",
      metadata,
      payment_intent,
      payment_status,
    );

    const checkoutPaymentVerify = await checkoutVerify(session_id);
    console.log("Payment verify", checkoutPaymentVerify);

    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F7F8F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="w-full max-w-2xl">
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/25">
              <BadgeCheck className="h-7 w-7" />
            </span>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Payment complete
            </p>

            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#17211F] sm:text-4xl">
              You&apos;re a Pro member now
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#66736F] sm:text-base">
              Your payment was successful and your Pro benefits are active. A
              confirmation receipt is on its way to your email.
            </p>
          </div>

          <Card className="mt-8 gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
            <CardHeader className="border-b border-[#E8ECE9] p-5 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-[#17211F] sm:text-lg">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment details
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5 sm:p-6">
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between gap-4 rounded-lg bg-[#FAFBFA] px-3 py-2.5">
                  <span className="text-[#66736F]">Status</span>

                  <span className="flex items-center gap-1.5 font-semibold text-primary">
                    <Check className="h-4 w-4" />
                    {payment_status === "paid" ? "Paid" : payment_status}
                  </span>
                </div>

                {customer_email && (
                  <div className="flex items-center justify-between gap-4 px-3 py-2.5">
                    <span className="shrink-0 text-[#66736F]">
                      Confirmation sent to
                    </span>

                    <span className="max-w-[60%] break-all text-right font-medium text-[#17211F]">
                      {customer_email}
                    </span>
                  </div>
                )}

                {metadata?.plan && (
                  <div className="flex items-center justify-between gap-4 px-3 py-2.5">
                    <span className="text-[#66736F]">Plan</span>

                    <span className="font-semibold text-[#17211F]">
                      {metadata.plan}
                    </span>
                  </div>
                )}

                {typeof payment_intent?.amount === "number" && (
                  <div className="flex items-center justify-between gap-4 px-3 py-2.5">
                    <span className="text-[#66736F]">Amount paid</span>

                    <span className="font-semibold text-[#17211F]">
                      {payment_intent.currency?.toUpperCase()}{" "}
                      {(payment_intent.amount / 100).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-[#E8ECE9] pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                  Transaction reference
                </p>

                <p className="mt-1.5 break-all rounded-lg border border-[#E8ECE9] bg-[#FAFBFA] px-3 py-2 font-mono text-xs text-[#66736F]">
                  {session_id}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-center">
            <Link href="/browse-tuitions">
              <Button className="h-11 w-full cursor-pointer bg-primary px-6 font-semibold text-primary-foreground hover:bg-[#2b8a76] sm:w-auto">
                Explore tuitions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
