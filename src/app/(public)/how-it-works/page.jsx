import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Search,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const studentSteps = [
  {
    icon: Users,
    title: "Sign up as a student",
    text: "Create a free account and choose the student role.",
  },
  {
    icon: Search,
    title: "Search verified tuitions",
    text: "Filter by subject, class level, mode and monthly budget.",
  },
  {
    icon: Send,
    title: "Apply for a batch",
    text: "Send your phone number, preferred schedule and a short note.",
  },
  {
    icon: CheckCircle2,
    title: "Get accepted",
    text: "Track the application status live and start learning.",
  },
];

const tutorSteps = [
  {
    icon: GraduationCap,
    title: "Sign up as a tutor",
    text: "Create a free tutor account in under a minute.",
  },
  {
    icon: BookOpen,
    title: "Post your batch",
    text: "Add subject, class, schedule, fee and a banner image.",
  },
  {
    icon: ShieldCheck,
    title: "Get admin approval",
    text: "Every listing is reviewed before it appears publicly.",
  },
  {
    icon: Users,
    title: "Manage applicants",
    text: "Accept or reject students from your tutor dashboard.",
  },
];

const groups = [
  { title: "For Students", steps: studentSteps },
  { title: "For Tutors", steps: tutorSteps },
];

export default function HowItWorksPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-primary">Workflow</p>

        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          How MentorLagbe Works
        </h1>

        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          One platform for students who need guidance and tutors who want to
          teach.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
              {group.title}
            </h2>

            <div className="mt-6 space-y-4">
              {group.steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <Card
                    key={step.title}
                    className="rounded-2xl border border-border bg-card p-5 shadow-none"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-muted-foreground">
                          STEP {index + 1}
                        </p>

                        <h3 className="mt-1 font-heading text-base font-bold text-foreground">
                          {step.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#0F4D42] px-6 py-12 text-center">
        <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
          Ready to get started?
        </h2>

        <p className="max-w-xl text-sm text-white/70">
          Join hundreds of students and tutors already using MentorLagbe.
        </p>

        <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button
            render={<Link href="/signup" />}
            nativeButton={false}
            className="h-11 w-full cursor-pointer bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90 sm:w-auto"
          >
            Create free account
          </Button>

          <Button
            render={<Link href="/browse-tuitions" />}
            nativeButton={false}
            variant="outline"
            className="h-11 w-full cursor-pointer border-white/30 bg-transparent px-6 font-semibold text-white hover:bg-white/10 hover:text-white sm:w-auto"
          >
            Browse tuitions
          </Button>
        </div>
      </div>
    </section>
  );
}
