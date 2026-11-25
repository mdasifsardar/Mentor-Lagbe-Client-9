import TuitionDetails from "@/components/browse-tuition/TuitionDetails";
import { getTuitionById } from "@/lib/actions/tutor/tutor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TuitionDetailsPage = async ({ params }) => {
  const { id } = await params;

  const tuition = await getTuitionById(id);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mb-6 max-w-5xl">
        <Link
          href="/browse-tuitions"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#66736F] transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tuitions
        </Link>
      </div>

      <TuitionDetails tuition={tuition} user={session?.user} />
    </section>
  );
};

export default TuitionDetailsPage;
