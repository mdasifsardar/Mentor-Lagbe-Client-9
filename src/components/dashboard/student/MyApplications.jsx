import { getStudentApplications } from "@/lib/actions/student/student";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MyApplications = async ({ email }) => {
  const data = await getStudentApplications(email);

  const applications = data?.applications || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Applications</CardTitle>
      </CardHeader>

      <CardContent>
        {applications.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">
            You haven&apos;t applied for any tuition yet.
          </p>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application._id} className="rounded-xl border p-4">
                <h3 className="font-semibold">{application.tuitionTitle}</h3>

                <p className="text-sm text-muted-foreground">
                  Subject: {application.subject}
                </p>

                <p className="text-sm text-muted-foreground">
                  Tutor: {application.tutorEmail}
                </p>

                <p className="text-sm">
                  Monthly Fee: ৳{application.monthlyFee}
                </p>

                <p className="mt-2 text-sm">Status: {application.status}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyApplications;
