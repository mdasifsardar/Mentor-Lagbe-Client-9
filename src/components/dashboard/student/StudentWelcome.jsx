import { GraduationCap } from "lucide-react";

const StudentWelcome = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground md:p-8">
      <div className="relative z-10 max-w-2xl">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
          <GraduationCap size={26} />
        </div>

        <h1 className="text-2xl font-bold md:text-3xl">
          Welcome to Your Student Dashboard!
        </h1>

        <p className="mt-2 text-sm leading-6 text-primary-foreground/80 md:text-base">
          Track your tuition applications, check your application status, and
          find the right tutor for your learning journey.
        </p>
      </div>

      <GraduationCap
        className="absolute -bottom-10 -right-5 text-white/10"
        size={190}
      />
    </div>
  );
};

export default StudentWelcome;
