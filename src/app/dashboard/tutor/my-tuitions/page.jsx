import MyTuitions from "@/components/dashboard/tutor/MyTuitions";
import { getTuitionByTutorEmail } from "@/lib/actions/tutor/tutor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const tutorEmail = session?.user?.email;

  const tuitionData = await getTuitionByTutorEmail(tutorEmail);

  return (
    <section>
      <MyTuitions tuitionData={tuitionData} />
    </section>
  );
};

export default page;
