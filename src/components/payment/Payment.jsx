"use client";

import {
  BadgeCheck,
  Check,
  ChevronRight,
  CreditCard,
  Headphones,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";

const PRO_PLANS = [
  {
    id: "student_pro",
    name: "Pro Student Plan",
    price: 10,
    features: [
      "Priority booking",
      "Unlimited bookmarks",
      "Pro badge on applications",
    ],
  },
  {
    id: "tutor_pro",
    name: "Pro Tutor Plan",
    price: 15,
    features: [
      "Unlimited tuition posts",
      "Verified tutor badge",
      "Applicant analytics",
      "Priority listing",
    ],
  },
];

const Payment = () => {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;

  const selectedPlan =
    role === "student" ? "student_pro" : role === "tutor" ? "tutor_pro" : null;
  const plan = PRO_PLANS.find((item) => item.id === selectedPlan);

  const handlePaymentCheckout = async (e) => {
    if (
      (role === "student" || role === "tutor") &&
      session?.user?.plan === "pro"
    ) {
      e.preventDefault();

      toast.error("You already have a Pro plan.");
      return;
    }
  };

  // Student/Tutor
  if (!plan) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F7F8F5] px-4 py-12 sm:px-6 sm:py-16">
        <div className="w-full max-w-lg">
          <Card className="gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
            <CardHeader className="border-b border-[#E8ECE9] p-6 text-center sm:p-8">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF3F1] text-[#C44E3F] ring-1 ring-[#F4DAD5]">
                <BadgeCheck className="h-6 w-6" />
              </span>

              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#88928F]">
                Upgrade unavailable
              </p>

              <CardTitle className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#17211F] sm:text-3xl">
                You&apos;re not eligible for a Pro plan
              </CardTitle>

              <p className="mt-3 text-sm leading-6 text-[#66736F]">
                Pro plans are available for Student and Tutor accounts only.
                Your current account can&apos;t be upgraded right now.
              </p>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <div className="rounded-xl border border-[#E8ECE9] bg-[#FAFBFA] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                  Eligible accounts
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-lg border border-[#E8ECE9] bg-white px-3 py-2.5">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-semibold text-[#17211F]">
                      Pro Student · $10
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-[#E8ECE9] bg-white px-3 py-2.5">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-semibold text-[#17211F]">
                      Pro Tutor · $15
                    </span>
                  </div>
                </div>
              </div>

              {role && (
                <p className="mt-4 text-center text-xs text-[#88928F]">
                  Current role:{" "}
                  <span className="font-semibold capitalize text-[#66736F]">
                    {role}
                  </span>
                </p>
              )}

              <Link
                href="/"
                className="mt-6 flex h-10 w-full items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground transition-colors hover:bg-[#2b8a76] hover:opacity-90"
              >
                Go Back
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#88928F]">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            No payment will be charged from this page.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F8F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Secure Checkout</p>

          <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-[#17211F] sm:text-3xl lg:text-4xl">
            Upgrade to Pro
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#66736F] sm:text-base">
            One-time payment. No subscription, no renewal.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* LEFT SIDE */}
          <Card className="h-full gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
            <CardHeader className="border-b border-[#E8ECE9] p-5 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-[#17211F] sm:text-lg">
                <BadgeCheck className="h-5 w-5 text-primary" />
                Choose your plan
              </CardTitle>

              <p className="mt-1 text-sm text-[#66736F]">
                Your plan is selected automatically based on your account role.
              </p>
            </CardHeader>

            <CardContent className="space-y-7 p-5 sm:p-6">
              {/* PLAN */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                  Your available plan
                </p>

                <div className="mt-4">
                  <div className="flex h-full flex-col rounded-xl border border-primary bg-primary/5 p-4 text-left ring-1 ring-primary/30">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#17211F]">
                        {plan.name}
                      </span>

                      <Check className="h-4 w-4 shrink-0 text-primary" />
                    </span>

                    <span className="mt-2 font-heading text-2xl font-bold text-primary">
                      ${plan.price}
                      <span className="ml-1 text-xs font-normal text-[#66736F]">
                        once
                      </span>
                    </span>

                    <span className="mt-3 space-y-2">
                      {plan.features.map((feature) => (
                        <span
                          key={feature}
                          className="flex items-start gap-2 text-xs leading-5 text-[#66736F]"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

                          {feature}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                    Payment method
                  </p>

                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#66736F]">
                    <Lock className="h-3 w-3 text-primary" />
                    Secured by Stripe
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-[#E2E8E5] bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CreditCard className="h-4 w-4" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-[#17211F]">
                        Credit or debit card
                      </span>

                      <span className="mt-0.5 block text-xs text-[#66736F]">
                        Card details are entered on Stripe&apos;s secure page.
                      </span>
                    </span>

                    <span className="flex shrink-0 items-center gap-1.5">
                      <span className="rounded border border-[#E2E8E5] bg-white px-1.5 py-0.5 text-[10px] font-black italic tracking-tight text-[#1A1F71]">
                        VISA
                      </span>

                      <span
                        className="flex items-center"
                        aria-label="Mastercard"
                      >
                        <span className="h-3.5 w-3.5 rounded-full bg-[#EB001B]" />

                        <span className="-ml-1.5 h-3.5 w-3.5 rounded-full bg-[#F79E1B]/90" />
                      </span>
                    </span>
                  </div>
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-[#88928F]">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  We never see or store your card number.
                </p>
              </div>

              {/* ACCOUNT */}
              <div className="flex items-center gap-3 rounded-xl border border-[#E8ECE9] bg-[#FAFBFA] p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UserRound className="h-4 w-4" />
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#88928F]">
                    Upgrading account
                  </p>

                  <p className="mt-0.5 break-all text-sm font-semibold text-[#17211F]">
                    {session.user.name || session.user.email}
                  </p>

                  <p className="mt-1 text-xs capitalize text-[#66736F]">
                    Role: {role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            {/* ORDER SUMMARY */}
            <Card className="gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
              <CardHeader className="border-b border-[#E8ECE9] p-4 sm:p-5">
                <CardTitle className="text-base font-bold text-[#17211F] sm:text-lg">
                  Order summary
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 rounded-xl border border-[#E8ECE9] bg-[#FAFBFA] p-3">
                  <div>
                    <p className="font-bold text-[#17211F]">{plan.name}</p>

                    <p className="mt-1 text-xs text-[#66736F]">
                      One-time upgrade
                    </p>
                  </div>

                  <Badge className="border-0 bg-secondary text-secondary-foreground hover:bg-secondary">
                    One-time
                  </Badge>
                </div>

                <div className="mt-4 space-y-1.5 border-t border-[#E8ECE9] pt-4 text-sm">
                  <div className="flex items-center justify-between text-[#66736F]">
                    <span>Plan price</span>

                    <span className="font-medium text-[#17211F]">
                      ${plan.price}.00
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#66736F]">
                    <span>Renewal</span>

                    <span className="font-medium text-[#17211F]">None</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E8ECE9] pt-2 text-base font-bold text-[#17211F]">
                    <span>Total</span>

                    <span className="text-primary">${plan.price}.00</span>
                  </div>
                </div>

                {/* STRIPE CHECKOUT FORM */}
                <form
                  onSubmit={handlePaymentCheckout}
                  action="/api/checkout_sessions"
                  method="POST"
                >
                  <input type="hidden" name="plan" value={selectedPlan} />
                  <Button
                    type="submit"
                    className="mt-4 h-10 w-full cursor-pointer rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-[#2b8a76] hover:opacity-90"
                  >
                    Pay ${plan.price}.00 with Stripe
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </form>

                <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[#66736F]">
                  <Lock className="h-3.5 w-3.5 text-primary" />
                  Your payment is processed securely by Stripe.
                </p>
              </CardContent>
            </Card>

            {/* SECURITY CARD */}
            <Card className="gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
              <CardContent className="space-y-4 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#17211F]">
                      Instant activation
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#66736F]">
                      Your Pro plan unlocks as soon as Stripe confirms payment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-[#E8ECE9] pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Headphones className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#17211F]">
                      Need help?
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 break-all text-xs leading-5 text-[#66736F]">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      support@mentorlagbe.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
