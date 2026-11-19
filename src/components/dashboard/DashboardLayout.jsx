"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const role = pathname.startsWith("/dashboard/student")
    ? "Student"
    : pathname.startsWith("/dashboard/admin")
      ? "Admin"
      : "Tutor";

  return (
    <SidebarProvider>
      <DashboardSidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-background">
        {/* Workspace Header */}
        <header className="flex h-16 shrink-0 items-center border-b border-border bg-card px-4 sm:px-6">
          {/* Sidebar Toggle */}
          <SidebarTrigger
            className="mr-3 h-8 w-8 shrink-0 "
            aria-label="Toggle sidebar"
          />

          {/* Workspace Title */}
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">
              {role} Workspace
            </p>

            <p className="hidden text-xs text-muted-foreground sm:block">
              Manage your {role.toLowerCase()} activities
            </p>
          </div>

          {/* Current User */}
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-foreground">{role}</p>

              <p className="text-xs text-muted-foreground">{role} Account</p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/20">
              {role.charAt(0)}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
