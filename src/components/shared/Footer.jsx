import Link from "next/link";
import { GraduationCap, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
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
    <footer className="border-t border-border bg-[#0F4D42] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D9A441]">
                <GraduationCap className="h-5 w-5 text-[#0F4D42]" />
              </div>

              <span className="font-heading text-xl font-bold">
                MentorLagbe
              </span>
            </Link>

            <p className="max-w-md text-sm leading-6 text-white/70">
              Smart tuition and mentorship platform connecting students with the
              right tutors for better learning.
            </p>

            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#D9A441]" />
                <span>hello@mentorlagbe.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#D9A441]" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-[#D9A441]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold">
              Follow Us
            </h3>

            <p className="mb-4 text-sm leading-6 text-white/70">
              Stay connected with MentorLagbe.
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#0F4D42]"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#0F4D42]"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#0F4D42]"
              >
                <FaTwitter className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MentorLagbe. All rights reserved.</p>

          <p>Smart learning starts with the right mentor.</p>
        </div>
      </div>
    </footer>
  );
}
