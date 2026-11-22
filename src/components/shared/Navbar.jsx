"use client";

import Link from "next/link";
import { GraduationCap, LayoutDashboard, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Navbar() {
  //        Navbar links
  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse Tuitions",
      href: "/browse-tuitions",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "How It Works",
      href: "/how-it-works",
    },
  ];

  //        Router
  const router = useRouter();

  //        User session
  const { data: session } = authClient.useSession();
  const user = session?.user;

  //        Sign out
  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>

          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            Mentor<span className="text-primary">Lagbe</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User session */}
        {user ? (
          <>
            {/* Logged In User UI */}
            <div className="flex items-center gap-2">
              {/* User Avatar & Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10 font-heading text-sm font-bold text-primary shadow-sm transition-all hover:border-primary hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer">
                  {user?.name.slice(0, 2)}
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-64 rounded-2xl border-border bg-card p-2 shadow-xl"
                >
                  {/* Profile Card */}
                  <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-primary font-heading text-lg font-bold text-primary-foreground shadow-sm">
                        {user?.name.slice(0, 2)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-foreground">
                          {user?.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user?.email}
                        </p>

                        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          <GraduationCap className="h-3 w-3" />
                          {user?.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1 py-2">
                    <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors focus:bg-primary/10 focus:text-primary">
                      <Link
                        href={`/dashboard/${user?.role}`}
                        className="flex w-full items-center gap-3"
                      >
                        <LayoutDashboard className="h-4 w-4 text-primary" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors focus:bg-primary/10 focus:text-primary">
                      <Link
                        href="/dashboard/profile"
                        className="flex w-full items-center gap-3"
                      >
                        <User className="h-4 w-4 text-primary" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="bg-border" />

                  {/* Sign Out */}
                  <div className="p-1">
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-100 focus:bg-red-100 focus:text-red-700"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Information */}
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-foreground">
                  {user?.name}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Desktop Auth Buttons */}
            <div className="hidden items-center gap-3 md:flex">
              <Button
                variant="ghost"
                className="font-medium text-foreground hover:bg-secondary hover:text-primary"
              >
                <Link href="/signin">Sign In</Link>
              </Button>

              <Button className="bg-primary font-medium text-primary-foreground hover:bg-[#0f4d42]">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </>
        )}

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary hover:text-primary md:hidden"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] border-border bg-card sm:w-[360px]"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-left">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>

                <span className="font-heading text-lg font-bold">
                  Mentor<span className="text-primary">Lagbe</span>
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-3 h-px bg-border" />

              <Button
                variant="outline"
                className="w-full border-border cursor-pointer"
              >
                <Link href="/signin">Sign In</Link>
              </Button>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-[#0f4d42] cursor-pointer">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
