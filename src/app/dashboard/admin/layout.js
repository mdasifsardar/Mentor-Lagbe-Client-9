import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?redirect=/dashboard/admin");
  }

  if (session.user.role !== "admin") {
    redirect(`/dashboard/${session.user.role || "student"}`);
  }

  return children;
}
