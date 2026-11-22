import StudentWelcome from "./StudentWelcome";
import StudentStats from "./StudentStats";
import RecentApplications from "./RecentApplications";
import { getStudentDashboard } from "@/lib/actions/student/student";

const StudentDashboard = async ({ email }) => {
  const dashboardData = await getStudentDashboard(email);

  return (
    <div className="space-y-8">
      <StudentWelcome />

      <StudentStats stats={dashboardData?.stats} />

      <RecentApplications
        applications={dashboardData?.recentApplications || []}
      />
    </div>
  );
};

export default StudentDashboard;
