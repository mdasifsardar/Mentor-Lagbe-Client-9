"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.role;

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
            <p className="font-heading text-sm font-semibold text-foreground capitalize">
              {role} Workspace
            </p>

            <p className="hidden text-xs text-muted-foreground sm:block">
              Manage your {role} activities
            </p>
          </div>

          {/* Current User */}
          <div className="ml-auto flex items-center gap-3">
            {/* User Information */}
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold leading-5 text-foreground">
                {user?.name}
              </p>

              <div className="mt-0.5 flex items-center justify-end gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />

                <p className="text-xs font-medium capitalize text-muted-foreground">
                  {role}
                </p>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10 font-heading text-sm font-bold text-primary shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
