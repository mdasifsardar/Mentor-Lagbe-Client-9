"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Users,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAdminStats,
  getReportedRevenue,
} from "@/lib/actions/admin/admin";

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAdminStats();
        setStats(data.stats);

        const reported = await getReportedRevenue();
        setRevenue(reported);
      } catch (error) {
        toast.error(error.message || "Failed to load admin statistics");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-56" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      label: "All roles",
      icon: Users,
      iconClassName: "bg-primary/10 text-primary",
      labelClassName: "bg-primary/10 text-primary",
    },
    {
      title: "Total Tutors",
      value: stats?.totalTutors ?? 0,
      label: "Tutors",
      icon: GraduationCap,
      iconClassName: "bg-secondary text-secondary-foreground",
      labelClassName: "bg-secondary text-secondary-foreground",
    },
    {
      title: "Total Students",
      value: stats?.totalStudents ?? 0,
      label: "Students",
      icon: Users,
      iconClassName: "bg-accent/15 text-[#8A651F]",
      labelClassName: "bg-accent/15 text-[#8A651F]",
    },
    {
      title: "Pending Tuitions",
      value: stats?.pendingTuitions ?? 0,
      label: "Review",
      icon: Clock3,
      iconClassName: "bg-amber-50 text-amber-700",
      labelClassName: "bg-amber-50 text-amber-700",
    },
    {
      title: "Approved Tuitions",
      value: stats?.approvedTuitions ?? 0,
      label: "Live",
      icon: CheckCircle2,
      iconClassName: "bg-emerald-50 text-emerald-700",
      labelClassName: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Total Applications",
      value: stats?.totalApplications ?? 0,
      label: "Requests",
      icon: FileText,
      iconClassName: "bg-primary/10 text-primary",
      labelClassName: "bg-primary/10 text-primary",
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary">Admin Dashboard</p>

        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Platform Overview
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Monitor users, tuition approvals and subscription revenue from one
          place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <DashboardStatCard key={card.title} {...card} />
        ))}
      </div>

      <Card className="gap-0 rounded-2xl border border-border bg-card shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-[#8A651F]">
              <Wallet className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Reported Revenue
              </p>

              <p className="mt-1 font-heading text-2xl font-bold text-foreground">
                ${Number(revenue).toFixed(2)}
              </p>
            </div>
          </div>

          <p className="max-w-sm text-xs leading-5 text-muted-foreground">
            Total paid by Pro members from Stripe.
          </p>
        </CardContent>
      </Card>

      <Card className="gap-0 rounded-2xl border border-border bg-card shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <p className="font-heading text-sm font-bold text-foreground">
                Moderation queue
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {stats?.pendingTuitions
                  ? `${stats.pendingTuitions} tuition post(s) are waiting for review. Open Manage Tuitions to approve or reject them.`
                  : "No tuition posts are waiting for review right now."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AdminOverview;
