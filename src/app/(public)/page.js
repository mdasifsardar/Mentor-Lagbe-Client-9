import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

import HomeSearch from "@/components/home/HomeSearch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getTuitions } from "@/lib/actions/tutor/tutor";
import { formatClassLevel } from "@/lib/format";

const steps = [
  {
    icon: Users,
    title: "Create your account",
    text: "Sign up as a student or a tutor. Pick your role and you are ready in under a minute.",
  },
  {
    icon: BookOpen,
    title: "Find or post a tuition",
    text: "Students filter verified batches by subject, class and mode. Tutors publish batches in minutes.",
  },
  {
    icon: CheckCircle2,
    title: "Apply and start learning",
    text: "Send an application, get accepted by the tutor, and begin your personalised mentorship.",
  },
];

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Programming",
  "IELTS",
  "ICT",
];

export default async function Home() {
  const data = await getTuitions("limit=6");
  const tuitions = data?.tuitions || [];

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F4D42]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#D9A441]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified tutors · Admin moderated
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find Your Ideal Tutor or Mentorship Batch Today
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              MentorLagbe connects students with verified tutors across
              Bangladesh — online or at home, by subject, class level and
              budget.
            </p>

            <div className="mt-8">
              <HomeSearch />
            </div>
          </div>

          <div className="relative hidden h-[420px] overflow-hidden rounded-3xl lg:block">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
              alt="Students learning with a tutor"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0F4D42]/70 to-transparent" />
          </div>
        </div>
      </section>

      {/* Featured tuitions */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Latest batches</p>

            <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured Tuitions
            </h2>
          </div>

          <Link href="/browse-tuitions">
            <Button variant="outline" className="h-10 cursor-pointer gap-2">
              Browse all tuitions <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {tuitions.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
            No approved tuitions yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((tuition) => (
              <Card
                key={tuition._id}
                className="group h-full gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative m-3 mb-0 h-44 overflow-hidden rounded-xl bg-muted sm:h-48">
                  <Image
                    src={tuition.bannerImage}
                    alt={tuition.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute bottom-3 left-3 flex max-w-[85%] items-center gap-1.5 truncate rounded-full bg-[#12352C]/90 px-3 py-1.5 text-xs font-medium text-white">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C89B5A]" />
                    {tuition.location}
                  </span>
                </div>

                <CardContent className="flex-1 space-y-3 px-5 pb-3 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge className="border-0 bg-secondary text-secondary-foreground hover:bg-secondary">
                      {tuition.subject}
                    </Badge>

                    <span className="text-xs font-medium text-muted-foreground">
                      {formatClassLevel(tuition.classLevel)}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-foreground">
                    {tuition.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-accent" />
                      {tuition.tutorName}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-accent" />
                      {tuition.daysPerWeek}d/week
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Wallet className="h-4 w-4 text-accent" />
                      {tuition.mode}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-5 py-4">
                  <p className="text-lg font-bold text-foreground sm:text-xl">
                    ৳{Number(tuition.monthlyFee).toLocaleString("en-BD")}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      /mo
                    </span>
                  </p>

                  <Button
                    render={<Link href={`/browse-tuitions/${tuition._id}`} />}
                    nativeButton={false}
                    className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#0F4D42]"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">Simple process</p>

            <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              How MentorLagbe Works
            </h2>

            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Three steps from sign up to your first class.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.title}
                  className="h-full gap-0 rounded-2xl border border-border bg-background p-6 shadow-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-heading text-3xl font-bold text-border">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.text}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">
              Popular right now
            </p>

            <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Top Subjects & Trusted Results
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {subjects.map((subject) => (
              <Link
                key={subject}
                href={`/browse-tuitions?subject=${encodeURIComponent(subject)}`}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:px-5 sm:py-2.5"
              >
                {subject}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
