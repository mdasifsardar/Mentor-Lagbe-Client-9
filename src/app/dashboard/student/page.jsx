import StudentDashboard from "@/components/dashboard/student/StudentDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const StudentDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="min-h-screen bg-[#F7F8F5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <StudentDashboard email={session?.user?.email} />
      </div>
    </section>
  );
};

export default StudentDashboardPage;
