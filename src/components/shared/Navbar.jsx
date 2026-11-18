"use client";

import Link from "next/link";
import { GraduationCap, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
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

              <Button variant="outline" className="w-full border-border">
                <Link href="/signin">Sign In</Link>
              </Button>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-[#0f4d42]">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
