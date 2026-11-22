import TuitionDetails from "@/components/browse-tuition/TuitionDetails";
import { getTuitionById } from "@/lib/actions/tutor/tutor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const TuitionDetailsPage = async ({ params }) => {
  const { id } = await params;

  const tuition = await getTuitionById(id);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <TuitionDetails tuition={tuition} user={session?.user} />
    </section>
  );
};

export default TuitionDetailsPage;
