import QuickOverview from "@/components/dashboard/tutor/QuickOverview";
import RecentTuitions from "@/components/dashboard/tutor/RecentTuitions";
import TutorStats from "@/components/dashboard/tutor/TutorStats";
import TutorWelcome from "@/components/dashboard/tutor/TutorWelcome";
import { getTuitionByTutorEmail, getApplicationsForTutor } from "@/lib/actions/tutor/tutor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const TutorDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const tutorEmail = session?.user?.email;

  const [tuitionData, applicationData] = await Promise.all([
    getTuitionByTutorEmail(tutorEmail),
    getApplicationsForTutor(tutorEmail),
  ]);

  const tuitions = tuitionData || [];
  const applications = applicationData?.applications || [];

  return (
    <section className="space-y-6">
      <TutorWelcome />

      <TutorStats tuitionData={tuitions} applications={applications} />

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentTuitions tuitions={tuitions} />
        <QuickOverview tuitions={tuitions} applications={applications} />
      </div>
    </section>
  );
};

export default TutorDashboardPage;
