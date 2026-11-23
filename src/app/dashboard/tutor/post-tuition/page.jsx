import PostTuitionForm from "@/components/dashboard/tutor/PostTuitionForm";
import React from "react";

const PostTuitionPage = () => {
  return (
    <section className="min-h-screen bg-[#F7F8F5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PostTuitionForm />
      </div>
    </section>
  );
};

export default PostTuitionPage;
