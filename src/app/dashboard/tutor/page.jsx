import QuickOverview from "@/components/dashboard/tutor/QuickOverview";
import RecentTuitions from "@/components/dashboard/tutor/RecentTuitions";
import TutorStats from "@/components/dashboard/tutor/TutorStats";
import TutorWelcome from "@/components/dashboard/tutor/TutorWelcome";
import { getTuitionByTutorEmail } from "@/lib/actions/tutor/tutor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const TutorDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const tutorEmail = session?.user?.email;

  const tuitionData = await getTuitionByTutorEmail(tutorEmail);

  return (
    <section className="space-y-6">
      <TutorWelcome />

      <TutorStats tuitionData={tuitionData} />

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentTuitions />
        <QuickOverview tuitionData={tuitionData} />
      </div>
    </section>
  );
};

export default TutorDashboardPage;
