import AdminTransactions from "@/components/dashboard/admin/AdminTransactions";

const page = () => {
  return (
    <section className="min-h-screen bg-[#F7F8F5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminTransactions />
      </div>
    </section>
  );
};

export default page;
