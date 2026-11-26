"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, UserRound } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminUsers, updateUserRole } from "@/lib/actions/admin/admin";
import { formatDate } from "@/lib/format";

const roleStyles = {
  admin: "border-0 bg-accent/15 text-[#8A651F] hover:bg-accent/15",
  tutor: "border-0 bg-primary/10 text-primary hover:bg-primary/10",
  student: "border-0 bg-secondary text-secondary-foreground hover:bg-secondary",
};

const AdminUsers = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [term, setTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAdminUsers();
        setUsers(data.users || []);
      } catch (error) {
        toast.error(error.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleRoleChange = async (id, role) => {
    const previous = users;

    setUsers((current) =>
      current.map((user) => (user._id === id ? { ...user, role } : user)),
    );
    setUpdatingId(id);

    try {
      const data = await updateUserRole(id, role);
      toast.success(data.message || "Role updated");
      router.refresh();
    } catch (error) {
      setUsers(previous);
      toast.error(error.message || "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = users.filter((user) => {
    const query = term.trim().toLowerCase();

    if (!query) return true;

    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary">Admin Dashboard</p>

        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Manage Users
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Review every registered account and change roles when required.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="h-11 pl-10"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-border bg-card shadow-none">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <UserRound className="h-10 w-10 text-muted-foreground" />

            <p className="font-heading text-lg font-semibold text-foreground">
              No users found
            </p>

            <p className="max-w-sm text-sm text-muted-foreground">
              Try a different search term.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop table */}
          <Card className="hidden gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">User</th>
                    <th className="px-5 py-3 font-semibold">Role</th>
                    <th className="px-5 py-3 font-semibold">Plan</th>
                    <th className="px-5 py-3 font-semibold">Joined</th>
                    <th className="px-5 py-3 font-semibold">Change role</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-border/70 last:border-0"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-xs font-bold text-primary">
                            {user.name?.slice(0, 2) || "ML"}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-foreground">
                              {user.name}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <Badge
                          className={
                            roleStyles[user.role] || roleStyles.student
                          }
                        >
                          {user.role}
                        </Badge>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm capitalize text-muted-foreground">
                          {user.plan || "free"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <Select
                          value={user.role}
                          onValueChange={(value) =>
                            handleRoleChange(user._id, value)
                          }
                          disabled={updatingId === user._id}
                        >
                          <SelectTrigger className="h-9 w-[140px]">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="tutor">Tutor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Mobile cards */}
          <div className="grid gap-4 lg:hidden">
            {filtered.map((user) => (
              <Card
                key={user._id}
                className="gap-0 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
                    {user.name?.slice(0, 2) || "ML"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-foreground">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <Badge className={roleStyles[user.role] || roleStyles.student}>
                    {user.role}
                  </Badge>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground">
                    Joined {formatDate(user.createdAt)}
                  </p>

                  <Select
                    value={user.role}
                    onValueChange={(value) => handleRoleChange(user._id, value)}
                    disabled={updatingId === user._id}
                  >
                    <SelectTrigger className="h-9 w-full max-w-[55%] sm:w-[130px] sm:max-w-none">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="tutor">Tutor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default AdminUsers;
