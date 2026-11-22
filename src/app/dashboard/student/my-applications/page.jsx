import MyApplications from "@/components/dashboard/student/MyApplications";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="p-4 md:p-6 lg:p-8">
      <MyApplications email={session?.user?.email} />
    </section>
  );
};

export default MyApplicationsPage;
