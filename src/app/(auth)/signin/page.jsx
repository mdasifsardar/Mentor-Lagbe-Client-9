import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
        <SignInForm />
      </div>
    </main>
  );
}
