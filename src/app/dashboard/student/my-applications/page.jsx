import MyApplications from "@/components/dashboard/student/MyApplications";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getStudentApplications } from "@/lib/actions/student/student";
import { getTuitions } from "@/lib/actions/tutor/tutor";

const MyApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await getStudentApplications(session?.user?.email);
  const applications = data?.applications || [];

  const tuitionsData = await getTuitions();
  const tuitions = tuitionsData?.tuitions || [];

  const tutorNames = new Map(
    tuitions
      .map((tuition) => [tuition.tutorEmail, tuition.tutorName])
      .filter(([, name]) => name),
  );

  return (
    <section className="min-h-screen bg-[#F7F8F5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <MyApplications
          applications={applications}
          tutorNames={tutorNames}
        />
      </div>
    </section>
  );
};

export default MyApplicationsPage;
