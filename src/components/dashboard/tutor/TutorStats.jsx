import { BookOpen, CheckCircle2, Users, Crown } from "lucide-react";

import DashboardStatCard from "@/components/dashboard/DashboardStatCard";

const TutorStats = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardStatCard
        title="Total Tuitions Posted"
        value="8"
        label="Total"
        icon={BookOpen}
        iconClassName="bg-primary/10 text-primary"
        labelClassName="bg-primary/10 text-primary"
      />

      <DashboardStatCard
        title="Active / Approved Tuitions"
        value="6"
        label="Approved"
        icon={CheckCircle2}
        iconClassName="bg-green-50 text-green-600"
        labelClassName="bg-green-50 text-green-600"
      />

      <DashboardStatCard
        title="Total Applicants Received"
        value="24"
        label="Applicants"
        icon={Users}
        iconClassName="bg-amber-50 text-amber-600"
        labelClassName="bg-amber-50 text-amber-600"
      />

      <DashboardStatCard
        title="Current Plan"
        value="Free"
        label="Current"
        icon={Crown}
        iconClassName="bg-[#D9A441]/10 text-[#D9A441]"
        labelClassName="bg-[#D9A441]/10 text-[#D9A441]"
      />
    </div>
  );
};

export default TutorStats;
