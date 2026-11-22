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
    options: ["Online", "Offline", "Both"],
  },
];

const TuitionFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const router = useRouter();

  const handleFilterChange = (groupId, label) => {
    const updatedFilters = {
      ...selectedFilters,
      [groupId]: selectedFilters[groupId] === label ? "" : label,
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
    <aside className="h-fit rounded-2xl border border-[#1E3A34]/10 bg-white p-5">
      <h2 className="text-lg font-semibold text-[#1E3A34]">Filters</h2>

      {filterGroups.map((group) => (
        <fieldset key={group.id} className="mt-6 border-0 p-0">
          <legend className="text-[13px] font-medium text-[#1E3A34]">
            {group.title}
          </legend>

          <div className="mt-3 space-y-3">
            {group.options.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  name={group.id}
                  value={option}
                  checked={selectedFilters[group.id] === option}
                  onChange={() => handleFilterChange(group.id, option)}
                  className="size-4 accent-[#1E3A34]"
                />

                <span className="text-sm text-[#1E3A34]">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </aside>
  );
};

export default TuitionFilters;
