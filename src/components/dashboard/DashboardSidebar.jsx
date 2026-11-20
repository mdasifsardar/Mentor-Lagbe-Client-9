"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Plus,
  BookOpen,
  Users,
  User,
  LogOut,
  GraduationCap,
  Search,
  FileText,
  CreditCard,
  ChevronRight,
  Crown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const menuItemsByRole = {
  tutor: [
    {
      title: "Dashboard",
      href: "/dashboard/tutor",
      icon: LayoutDashboard,
    },
    {
      title: "Post Tuition",
      href: "/dashboard/tutor/post-tution",
      icon: Plus,
    },
    {
      title: "My Tuitions",
      href: "/dashboard/tutor/my-tuitions",
      icon: BookOpen,
    },
    {
      title: "Applicants",
      href: "/dashboard/tutor/applicants",
      icon: Users,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],

  student: [
    {
      title: "Dashboard",
      href: "/dashboard/student",
      icon: LayoutDashboard,
    },
    {
      title: "Browse Tuitions",
      href: "/browse-tuitions",
      icon: Search,
    },
    {
      title: "My Applications",
      href: "/dashboard/student/applications",
      icon: FileText,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],

  admin: [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Manage Tuitions",
      href: "/dashboard/admin/tuitions",
      icon: BookOpen,
    },
    {
      title: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      {/* Logo + Sidebar Toggle */}
      <SidebarHeader className="relative h-16 border-b border-border ">
        <Link href="/" className="flex h-full items-center gap-3 pr-8">
          {/* Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>

          <div className="group-data-[collapsible=icon]:hidden">
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              Mentor
              <span className="text-primary">Lagbe</span>
            </span>
          </div>
        </Link>

        {/* Desktop Sidebar Toggle */}
        <SidebarTrigger
          className="absolute right-2 top-4 md:hidden h-8 w-8 translate-y-0 !translate-y-0 !animate-none transition-none"
          aria-label="Toggle sidebar"
        />
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="py-5">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {menuItemsByRole[role]?.map((item) => {
                const Icon = item.icon;

                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`h-11 rounded-xl px-3 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex w-full items-center gap-3"
                      >
                        <Icon className="h-[18px] w-[18px] shrink-0" />

                        <span className="truncate">{item.title}</span>

                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9A441]" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t border-border p-3">
        {/* Free Plan */}
        <div className="mb-2 rounded-xl border border-[#D9A441]/25 bg-[#D9A441]/10 p-4 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D9A441]/20">
              <Crown className="h-4 w-4 text-[#A87520]" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground">Free Plan</p>

              <p className="truncate text-[10px] text-muted-foreground">
                Up to 2 tuition posts
              </p>
            </div>
          </div>

          <Link
            href="/pricing"
            className="mt-3 flex items-center justify-between text-xs font-semibold text-[#8A651F] hover:text-[#6F5018]"
          >
            <span>Explore Pro</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
        </div>

        {/* Sign Out */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="h-10 cursor-pointer justify-center rounded-xl border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-100 hover:text-red-700 focus:bg-red-100 focus:text-red-700"
            >
              <Link href="/" className="flex w-full items-center gap-3">
                <LogOut className="h-4 w-4 shrink-0" />
                <span className="truncate">Sign Out</span>
                <ChevronRight className="ml-auto h-4 w-4 shrink-0 group-data-[collapsible=icon]:hidden" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
