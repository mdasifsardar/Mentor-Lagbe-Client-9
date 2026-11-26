import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import NotFoundCard from "@/components/not-found/NotFoundCard";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "404 - Page Not Found | MentorLagbe",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F8F5] text-[#17211F]">
        <NotFoundCard />
      </body>
    </html>
  );
}
