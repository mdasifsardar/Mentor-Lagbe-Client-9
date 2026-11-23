import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  {
    name: "Student Free",
    price: "$0",
    period: "forever",
    tagline: "Start exploring verified tuitions.",
    features: [
      "Browse all approved tuitions",
      "Apply to unlimited batches",
      "Bookmark up to 5 tuitions",
    ],
  },
  {
    name: "Student Pro",
    price: "$10",
    period: "per month",
    tagline: "For students who want priority.",
    features: [
      "Unlimited bookmarks",
      "Priority booking",
      "Pro badge on applications",
      "Faster tutor responses",
    ],
    featured: true,
  },
  {
    name: "Tutor Free",
    price: "$0",
    period: "forever",
    tagline: "Publish your first batches.",
    features: [
      "Up to 2 tuition posts",
      "Manage applicants",
      "Basic tutor profile",
    ],
  },
  {
    name: "Tutor Pro",
    price: "$15",
    period: "per month",
    tagline: "For tutors who teach at scale.",
    features: [
      "Unlimited tuition posts",
      "Verified tutor badge",
      "Priority listing",
      "Applicant analytics",
    ],
    featured: true,
  },
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-primary">Plans</p>

        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          Upgrade when you are ready
        </h1>

        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Start free. Upgrade to Pro for unlimited access and priority
          placement.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`h-full gap-0 overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-300 ${
              plan.featured
                ? "border-2 border-[#D9A441] bg-[#D9A441]/10 hover:shadow-xl"
                : "border border-border bg-card hover:shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-heading text-lg font-bold text-foreground">
                {plan.name}
              </h2>

              {plan.featured && (
                <Badge className="border-0 bg-accent text-accent-foreground hover:bg-accent">
                  Popular
                </Badge>
              )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

            <p className="mt-4 font-heading text-3xl font-bold text-foreground">
              {plan.price}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                {plan.period}
              </span>
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0F4D42]" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button
                render={!plan.featured ? undefined : <Link href="/payment" />}
                nativeButton={plan.featured ? false : true}
                disabled={!plan.featured}
                className="h-11 w-full cursor-pointer rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-[#2b8a76] hover:opacity-90"
              >
                {plan.name === "Student Free"
                  ? "Student current plan"
                  : plan.name === "Tutor Free"
                    ? "Tutor current plan"
                    : "Get Started"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-heading text-lg font-bold text-foreground">
          What happens after payment?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            "Your purchase is confirmed and recorded in your account.",
            "Your plan switches to Pro and the limits are lifted instantly.",
          ].map((item, index) => (
            <div key={item} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </span>

              <p className="text-sm leading-6 text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
