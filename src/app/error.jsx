"use client";

export default function Error({ retry }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 text-center">
      <div>
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please try again. If the problem continues, check your connection.
        </p>
      </div>

      <button
        type="button"
        onClick={retry}
        className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-dark"
      >
        Try again
      </button>
    </main>
  );
}
