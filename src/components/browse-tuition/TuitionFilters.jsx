"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const filterGroups = [
  {
    id: "subject",
    title: "Subject",
    options: [
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "English",
      "ICT",
    ],
  },
  {
    id: "classLevel",
    title: "Class",
    options: [
      "class-6",
      "class-7",
      "class-8",
      "class-9",
      "class-10",
      "class-11",
      "class-12",
    ],
  },
  {
    id: "mode",
    title: "Tuition Mode",
    options: ["Online", "Offline"],
  },
];

const TuitionFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const router = useRouter();

  const handleFilterChange = (groupId, label) => {
    const updatedFilters = {
      ...selectedFilters,
      [groupId]: label,
    };

    setSelectedFilters(updatedFilters);

    const params = new URLSearchParams();

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    router.push(
      `/browse-tuitions${params.toString() ? `?${params.toString()}` : ""}`,
    );
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      {filterGroups.map((group) => (
        <div key={group.id} className="flex flex-col gap-2">
          <label
            htmlFor={`browse-filter-${group.id}`}
            className="text-sm font-semibold text-[#1E3A34]"
          >
            {group.title}
          </label>

          <select
            id={`browse-filter-${group.id}`}
            name={group.id}
            value={selectedFilters[group.id] || ""}
            onChange={(e) => handleFilterChange(group.id, e.target.value)}
            className="h-11 w-44 cursor-pointer rounded-xl border-2 border-[#1E3A34]/20 bg-white px-4 text-sm font-medium text-[#1E3A34] shadow-sm transition-colors hover:border-[#0F4D42]/40 focus-visible:border-[#0F4D42] focus-visible:outline-none"
          >
            <option value="">All {group.title}</option>
            {group.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default TuitionFilters;
