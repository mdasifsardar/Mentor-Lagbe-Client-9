"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TuitionCard from "./BrowseTuitionsCard";
import TuitionFilters from "./TuitionFilters";

const BrowseTuitions = ({ tuitions = [], searchParams = {} }) => {
  const router = useRouter();
  const [term, setTerm] = useState(searchParams?.search || "");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    Object.entries(searchParams || {}).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    if (term.trim()) params.set("search", term.trim());
    else params.delete("search");

    router.push(
      `/browse-tuitions${params.toString() ? `?${params.toString()}` : ""}`,
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-[#1E3A34] sm:text-3xl">
          Find Your Perfect Tuition
        </h1>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Explore available tuition opportunities and connect with the right
          tutor.
        </p>

        <form onSubmit={handleSearch} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search by title, subject or tutor..."
              className="h-11 pl-10"
            />
          </div>

          <Button
            type="submit"
            className="h-11 cursor-pointer bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            Search
          </Button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <TuitionFilters />

        <section>
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-[#1E3A34] sm:text-xl">
              Available Tuitions
            </h2>

            <p className="text-sm text-muted-foreground">
              {tuitions.length} opportunities found
            </p>
          </div>

          {tuitions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#1E3A34]/20 py-16 text-center">
              <h2 className="text-lg font-semibold text-[#1E3A34]">
                No Tuitions Available
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {tuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BrowseTuitions;
