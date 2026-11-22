import StudentDashboard from "@/components/dashboard/student/StudentDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const StudentDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="p-4 md:p-6 lg:p-8">
      <StudentDashboard email={session?.user?.email} />
    </section>
  );
};

export default StudentDashboardPage;
