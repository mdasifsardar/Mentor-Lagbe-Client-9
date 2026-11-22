import { BookOpen, CheckCircle2, Clock, Crown } from "lucide-react";

import StudentStatCard from "./StudentStatCard";

const StudentStats = ({ stats }) => {
  const statItems = [
    {
      title: "Total Applied Tuitions",
      value: stats?.totalApplied ?? 0,
      description: "All your applications",
      icon: BookOpen,
    },
    {
      title: "Accepted Applications",
      value: stats?.acceptedApplications ?? 0,
      description: "Successfully accepted",
      icon: CheckCircle2,
    },
    {
      title: "Pending Applications",
      value: stats?.pendingApplications ?? 0,
      description: "Waiting for response",
      icon: Clock,
    },
    {
      title: "Current Plan",
      value: stats?.currentPlan ?? "Free",
      description: "Your current membership",
      icon: Crown,
    },
  ];
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Dashboard Overview</h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((stat) => (
          <StudentStatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StudentStats;
