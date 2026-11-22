import { getTuitions } from "@/lib/actions/tutor/tutor";
import TuitionCard from "./BrowseTuitionsCard";
import TuitionFilters from "./TuitionFilters";

const BrowseTuitions = async () => {
  const tuitions = await getTuitions();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#1E3A34]">
          Find Your Perfect Tuition
        </h1>

        <p className="mt-2 text-muted-foreground">
          Explore available tuition opportunities and connect with the right
          tutor.
        </p>
      </div>

      {/* Search & Filters */}
      <TuitionFilters />

      {/* Results */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#1E3A34]">
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
              There are no approved tuitions available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTuitions;
