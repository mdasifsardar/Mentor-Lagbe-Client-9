import Applicants from "@/components/dashboard/tutor/Applicants";
import { getApplicationsForTutor } from "@/lib/actions/tutor/tutor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const TutorApplicantsPage = async () => {
  //
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const tutorEmail = session?.user?.email;

  const studentApplicantsData = await getApplicationsForTutor(tutorEmail);

  return (
    <section>
      <Applicants applications={studentApplicantsData.applications} />
    </section>
  );
};

export default TutorApplicantsPage;
