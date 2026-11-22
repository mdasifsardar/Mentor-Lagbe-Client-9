"use client";

import { RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TuitionFilters = () => {
  return (
    <form className="rounded-2xl border border-[#1E3A34]/10 bg-white p-5 shadow-sm">
      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            name="search"
            placeholder="Search tuitions by title, tutor, or keyword..."
            className="h-12 border-[#1E3A34]/10 bg-[#FAF6EF]/50 pl-11 focus-visible:ring-[#1E3A34]"
          />
        </div>

        <Button
          type="submit"
          className="group h-12 gap-2 rounded-xl bg-[#176B5B] px-7 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#125447] hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
        >
          <Search className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          Search
        </Button>
      </div>

      {/* Filters */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#1E3A34]">Subject</label>

          <Select name="subject" defaultValue="all">
            <SelectTrigger className="h-11 w-full border-[#1E3A34]/10 bg-[#FAF6EF]/50">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Biology">Biology</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#1E3A34]">
            Class Level
          </label>

          <Select name="classLevel" defaultValue="all">
            <SelectTrigger className="h-11 w-full border-[#1E3A34]/10 bg-[#FAF6EF]/50">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="class-6">Class 6</SelectItem>
              <SelectItem value="class-7">Class 7</SelectItem>
              <SelectItem value="class-8">Class 8</SelectItem>
              <SelectItem value="class-9">Class 9</SelectItem>
              <SelectItem value="class-10">Class 10</SelectItem>
              <SelectItem value="class-11">Class 11</SelectItem>
              <SelectItem value="class-12">Class 12</SelectItem>
              <SelectItem value="ssc">SSC</SelectItem>
              <SelectItem value="hsc">HSC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#1E3A34]">Mode</label>

          <Select name="mode" defaultValue="all">
            <SelectTrigger className="h-11 w-full border-[#1E3A34]/10 bg-[#FAF6EF]/50">
              <SelectValue placeholder="All Modes" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Modes</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="Offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col justify-end">
          <Button
            type="reset"
            variant="outline"
            className="h-11 w-full gap-2 border-[#1E3A34]/15 text-[#1E3A34] hover:bg-[#FAF6EF] cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TuitionFilters;
