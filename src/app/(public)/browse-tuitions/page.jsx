import BrowseTuitions from "@/components/browse-tuition/BrowseTuitions";
import { getTuitions } from "@/lib/actions/tutor/tutor";

const BrowseTuitionsPage = async ({ searchParams }) => {
  const search = await searchParams;

  const urlSearch = new URLSearchParams(search);
  const query = urlSearch.toString();

  const data = await getTuitions(query);
  const tuitions = data?.tuitions || [];

  return <BrowseTuitions tuitions={tuitions} searchParams={search} />;
};

export default BrowseTuitionsPage;
