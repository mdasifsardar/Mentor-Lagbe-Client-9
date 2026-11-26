"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Clock3, MapPin, Search, X } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAdminTuitions,
  updateTuitionApproval,
} from "@/lib/actions/admin/admin";
import { formatClassLevel, formatDate } from "@/lib/format";

const statusStyles = {
  approved: "border-0 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  pending: "border-0 bg-amber-50 text-amber-700 hover:bg-amber-50",
  rejected: "border-0 bg-red-50 text-red-600 hover:bg-red-50",
};

const filters = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

const AdminTuitions = () => {
  const router = useRouter();
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [term, setTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAdminTuitions();
        setTuitions(data.tuitions || []);
      } catch (error) {
        toast.error(error.message || "Failed to load tuitions");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleApproval = async (id, approvalStatus) => {
    const previous = tuitions;

    setTuitions((current) =>
      current.map((tuition) =>
        tuition._id === id ? { ...tuition, approvalStatus } : tuition,
      ),
    );
    setUpdatingId(id);

    try {
      const data = await updateTuitionApproval(id, approvalStatus);
      toast.success(data.message || "Tuition updated");
      router.refresh();
    } catch (error) {
      setTuitions(previous);
      toast.error(error.message || "Failed to update tuition");
    } finally {
      setUpdatingId(null);
    }
  };

  const counts = useMemo(
    () => ({
      all: tuitions.length,
      pending: tuitions.filter((item) => item.approvalStatus === "pending")
        .length,
      approved: tuitions.filter((item) => item.approvalStatus === "approved")
        .length,
      rejected: tuitions.filter((item) => item.approvalStatus === "rejected")
        .length,
    }),
    [tuitions],
  );

  const filtered = tuitions.filter((tuition) => {
    if (filter !== "all" && tuition.approvalStatus !== filter) return false;

    const query = term.trim().toLowerCase();

    if (!query) return true;

    return (
      tuition.title?.toLowerCase().includes(query) ||
      tuition.tutorName?.toLowerCase().includes(query) ||
      tuition.subject?.toLowerCase().includes(query)
    );
  });

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary">Admin Dashboard</p>

        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Manage Tuitions
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Approve new batches so they appear on the public site, or reject
          listings that do not meet the guidelines.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === item.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {item.label} ({counts[item.key]})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search title, subject or tutor..."
            className="h-11 pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-border bg-card shadow-none">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <Clock3 className="h-10 w-10 text-muted-foreground" />

            <p className="font-heading text-lg font-semibold text-foreground">
              Nothing to review
            </p>

            <p className="max-w-sm text-sm text-muted-foreground">
              No tuition matches this filter right now.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filtered.map((tuition) => (
            <Card
              key={tuition._id}
              className="gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-20 sm:w-28">
                  {tuition.bannerImage ? (
                    <Image
                      src={tuition.bannerImage}
                      alt={tuition.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 112px"
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={
                        statusStyles[tuition.approvalStatus] ||
                        statusStyles.pending
                      }
                    >
                      {tuition.approvalStatus}
                    </Badge>

                    <Badge className="border-0 bg-secondary text-secondary-foreground hover:bg-secondary">
                      {tuition.subject}
                    </Badge>

                    <span className="text-xs text-muted-foreground">
                      {formatClassLevel(tuition.classLevel)} ·{" "}
                      {tuition.mode}
                    </span>
                  </div>

                  <h2 className="mt-2 line-clamp-2 font-heading text-base font-bold text-foreground">
                    {tuition.title}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="truncate">{tuition.tutorName}</span>

                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {tuition.location}
                    </span>

                    <span>
                      ৳{Number(tuition.monthlyFee || 0).toLocaleString("en-BD")}
                      /mo
                    </span>

                    <span>Posted {formatDate(tuition.createdAt)}</span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2 sm:flex-col">
                  {tuition.approvalStatus !== "approved" && (
                    <Button
                      onClick={() => handleApproval(tuition._id, "approved")}
                      disabled={updatingId === tuition._id}
                      className="h-9 flex-1 cursor-pointer gap-1.5 bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-[#0F4D42] sm:flex-none"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                  )}

                  {tuition.approvalStatus !== "rejected" && (
                    <Button
                      onClick={() => handleApproval(tuition._id, "rejected")}
                      disabled={updatingId === tuition._id}
                      variant="outline"
                      className="h-9 flex-1 cursor-pointer gap-1.5 px-4 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 sm:flex-none"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminTuitions;
