import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const TutorWelcome = async () => {
  //
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-semibold text-primary">
          Welcome back, {user?.name}
        </p>

        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl capitalize">
          {user?.role} Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Manage your tuition posts and keep track of your applicants from your
          dashboard.
        </p>
      </div>

      <Link href={"/dashboard/tutor/post-tuition"}>
        <Button className="h-10 w-full shrink-0 bg-primary font-semibold text-primary-foreground hover:bg-primary-dark sm:w-auto cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Post New Tuition
        </Button>
      </Link>
    </div>
  );
};

export default TutorWelcome;
