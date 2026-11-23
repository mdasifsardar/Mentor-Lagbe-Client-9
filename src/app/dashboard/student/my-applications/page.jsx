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
    <section className="p-4 md:p-6 lg:p-8">
      <MyApplications
        applications={applications}
        tutorNames={tutorNames}
      />
    </section>
  );
};

export default MyApplicationsPage;
