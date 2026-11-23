import {
  BadgeCheck,
  Check,
  ChevronRight,
  CreditCard,
  Headphones,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
  UserRound,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const paymentMethods = [
  {
    id: "card",
    label: "Credit / Debit Card",
    note: "Visa, Mastercard",
    icon: CreditCard,
  },
  {
    id: "bkash",
    label: "bKash",
    note: "Pay from your mobile wallet",
    icon: Smartphone,
  },
  {
    id: "nagad",
    label: "Nagad",
    note: "Pay from your mobile wallet",
    icon: Wallet,
  },
];

const planBenefits = [
  "Unlimited tuition posts",
  "Priority listing",
  "Applicant analytics",
  "Faster tutor responses",
];

const Payment = () => {
  return (
    <section className="min-h-screen bg-[#F7F8F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Secure Checkout</p>

          <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-[#17211F] sm:text-3xl lg:text-4xl">
            Complete your payment
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#66736F] sm:text-base">
            Review your plan and fill in the details below to upgrade your
            MentorLagbe account.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Payment details */}
          <Card className="h-full gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
            <CardHeader className="border-b border-[#E8ECE9] p-5 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-[#17211F] sm:text-lg">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment details
              </CardTitle>

              <p className="mt-1 text-sm text-[#66736F]">
                Enter your billing information and choose a payment method.
              </p>
            </CardHeader>

            <CardContent className="space-y-7 p-5 sm:p-6">
              {/* Billing information */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                  Billing information
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="full-name">Full name</Label>

                    <Input
                      id="full-name"
                      name="full-name"
                      placeholder="Md Asif"
                      className="h-11 rounded-xl border-[#E2E8E5] bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 rounded-xl border-[#E2E8E5] bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className="h-11 rounded-xl border-[#E2E8E5] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                  Payment method
                </p>

                <div className="mt-4 space-y-3">
                  {paymentMethods.map((method, index) => {
                    const Icon = method.icon;

                    return (
                      <label
                        key={method.id}
                        htmlFor={`payment-${method.id}`}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E8ECE9] bg-white p-4 transition-all hover:border-primary/50 hover:bg-primary/5 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary/30"
                      >
                        <input
                          id={`payment-${method.id}`}
                          name="paymentMethod"
                          type="radio"
                          defaultChecked={index === 0}
                          className="h-4 w-4 accent-[#176B5B]"
                        />

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="flex-1">
                          <span className="block text-sm font-semibold text-[#17211F]">
                            {method.label}
                          </span>

                          <span className="mt-0.5 block text-xs text-[#66736F]">
                            {method.note}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Card details */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#88928F]">
                  Card details
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="card-number">Card number</Label>

                    <Input
                      id="card-number"
                      name="card-number"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      className="h-11 rounded-xl border-[#E2E8E5] bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry date</Label>

                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM / YY"
                      className="h-11 rounded-xl border-[#E2E8E5] bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>

                    <Input
                      id="cvc"
                      name="cvc"
                      inputMode="numeric"
                      placeholder="123"
                      className="h-11 rounded-xl border-[#E2E8E5] bg-white"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order summary */}
          <div className="space-y-4">
            <Card className="gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
              <CardHeader className="border-b border-[#E8ECE9] p-4 sm:p-5">
                <CardTitle className="text-base font-bold text-[#17211F] sm:text-lg">
                  Order summary
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 rounded-xl border border-[#E8ECE9] bg-[#FAFBFA] p-3">
                  <div>
                    <p className="font-bold text-[#17211F]">Pro Plan</p>

                    <p className="mt-1 text-xs text-[#66736F]">
                      Billed monthly
                    </p>
                  </div>

                  <Badge className="border-0 bg-secondary text-secondary-foreground hover:bg-secondary">
                    Monthly
                  </Badge>
                </div>

                <ul className="mt-4 space-y-2">
                  {planBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-sm text-[#66736F]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-1.5 border-t border-[#E8ECE9] pt-4 text-sm">
                  <div className="flex items-center justify-between text-[#66736F]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#17211F]">$10.00</span>
                  </div>

                  <div className="flex items-center justify-between text-[#66736F]">
                    <span>Service fee</span>
                    <span className="font-medium text-[#17211F]">$0.00</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E8ECE9] pt-2 text-base font-bold text-[#17211F]">
                    <span>Total</span>
                    <span className="text-primary">$10.00</span>
                  </div>
                </div>

                <Button
                  type="button"
                  className="mt-4 h-10 w-full cursor-pointer rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-[#2b8a76] hover:opacity-90"
                >
                  Pay $10.00
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[#66736F]">
                  <Lock className="h-3.5 w-3.5 text-primary" />
                  Your payment information is kept secure.
                </p>
              </CardContent>
            </Card>

            <Card className="gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
              <CardContent className="space-y-4 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#17211F]">
                      Trusted checkout
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#66736F]">
                      Your plan activates as soon as the payment is confirmed.
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

                    <p className="mt-1 flex items-center gap-1.5 text-xs leading-5 text-[#66736F]">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      support@mentorlagbe.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-[#E8ECE9] pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <UserRound className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-[#17211F]">
                      Verified platform
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#66736F]">
                      Join students and tutors already using MentorLagbe.
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
