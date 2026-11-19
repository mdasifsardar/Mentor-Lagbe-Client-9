import QuickOverview from "@/components/dashboard/tutor/QuickOverview";
import RecentTuitions from "@/components/dashboard/tutor/RecentTuitions";
import TutorStats from "@/components/dashboard/tutor/TutorStats";
import TutorWelcome from "@/components/dashboard/tutor/TutorWelcome";

const TutorDashboardPage = () => {
  return (
    <section className="space-y-6">
      <TutorWelcome />

      <TutorStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentTuitions />
        <QuickOverview />
      </div>
    </section>
  );
};

export default TutorDashboardPage;
