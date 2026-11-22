"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomeSearch() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = term.trim();

    router.push(
      `/browse-tuitions${query ? `?search=${encodeURIComponent(query)}` : ""}`,
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl flex-col gap-2 rounded-2xl bg-card p-2 shadow-xl sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search subject, class or tutor..."
          className="h-12 border-0 bg-transparent pl-11 text-foreground shadow-none focus-visible:ring-0"
        />
      </div>

      <Button
        type="submit"
        className="h-12 cursor-pointer rounded-xl bg-primary px-7 font-semibold text-primary-foreground hover:bg-[#0F4D42]"
      >
        Find Tuition
      </Button>
    </form>
  );
}
