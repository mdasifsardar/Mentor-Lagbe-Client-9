import { Compass, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const NotFoundCard = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F7F8F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="w-full max-w-xl">
        <Card className="gap-0 overflow-hidden rounded-2xl border border-[#E2E8E5] bg-white shadow-sm">
          <CardContent className="p-8 text-center sm:p-12">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/25">
              <Compass className="h-8 w-8" />
            </span>

            <p className="mt-6 font-heading text-6xl font-bold tracking-tight text-primary sm:text-7xl">
              404
            </p>

            <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#17211F] sm:text-3xl">
              Page not found
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#66736F] sm:text-base">
              The page you are looking for does not exist or has been moved.
              Let&apos;s get you back on track.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/browse-tuitions">
                <Button className="h-11 w-full cursor-pointer bg-primary px-6 font-semibold text-primary-foreground hover:bg-[#2b8a76] sm:w-auto">
                  <Compass className="h-4 w-4" />
                  Browse tuitions
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="outline"
                  className="h-11 w-full cursor-pointer border-[#E2E8E5] px-6 font-semibold text-[#17211F] hover:bg-[#F1F4F2] sm:w-auto"
                >
                  <Home className="h-4 w-4" />
                  Back to home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-[#88928F]">
          MentorLagbe — Smart Tuition &amp; Mentorship Platform
        </p>
      </div>
    </section>
  );
};

export default NotFoundCard;
