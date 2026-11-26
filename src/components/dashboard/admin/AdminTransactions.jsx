"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAdminTransactions,
  getReportedRevenue,
} from "@/lib/actions/admin/admin";
import { formatDate } from "@/lib/format";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAdminTransactions();
        const list = data.transactions || [];

        // Show the newest payment first.
        setTransactions(
          [...list].sort(
            (a, b) => new Date(b.payment_date) - new Date(a.payment_date),
          ),
        );

        const reported = await getReportedRevenue();
        setRevenue(reported);
      } catch (error) {
        toast.error(error.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary">Admin Dashboard</p>

        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Transactions
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Every Pro payment recorded in your transaction history.
        </p>
      </div>

      <Card className="gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <CardContent className="flex flex-wrap items-center gap-4 p-5 sm:p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-[#8A651F]">
            <CreditCard className="h-6 w-6" />
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Reported Revenue
              </p>

              <p className="mt-1 font-heading text-2xl font-bold text-foreground">
                ${Number(revenue).toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Payments
              </p>

              <p className="mt-1 font-heading text-2xl font-bold text-foreground">
                {transactions.length}
              </p>
            </div>
          </div>

          <p className="ml-auto hidden text-sm text-muted-foreground sm:block">
            Latest payments first
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-border bg-card shadow-none">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <CreditCard className="h-10 w-10 text-muted-foreground" />

            <p className="font-heading text-lg font-semibold text-foreground">
              No transactions yet
            </p>

            <p className="max-w-sm text-sm text-muted-foreground">
              Payments will appear here as soon as a user upgrades to Pro.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop table */}
          <Card className="hidden gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Customer</th>
                    <th className="px-5 py-3 font-semibold">Session</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Date</th>
                    <th className="px-5 py-3 text-right font-semibold">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-border/70 last:border-0 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-foreground">
                          {item.customer_email}
                        </p>

                        <p className="max-w-[240px] truncate font-mono text-xs text-muted-foreground">
                          {item.payment_intent}
                        </p>
                      </td>

                      <td className="max-w-[220px] truncate px-5 py-4 font-mono text-xs text-muted-foreground">
                        {item.sessionId}
                      </td>

                      <td className="px-5 py-4">
                        <Badge className="border-0 bg-emerald-50 capitalize text-emerald-700 hover:bg-emerald-50">
                          {item.payment_status || item.status}
                        </Badge>
                      </td>

                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {formatDate(item.payment_date)}
                      </td>

                      <td className="px-5 py-4 text-right font-heading text-base font-bold text-foreground">
                        ${Number(item.amount || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Mobile cards */}
          <div className="grid gap-4 lg:hidden">
            {transactions.map((item) => (
              <Card
                key={item._id}
                className="gap-0 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">
                      {item.customer_email}
                    </p>

                    <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                      {item.sessionId}
                    </p>
                  </div>

                  <p className="shrink-0 font-heading text-lg font-bold text-foreground">
                    ${Number(item.amount || 0).toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                  <Badge className="border-0 bg-emerald-50 capitalize text-emerald-700 hover:bg-emerald-50">
                    {item.payment_status || item.status}
                  </Badge>

                  <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(item.payment_date)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default AdminTransactions;
