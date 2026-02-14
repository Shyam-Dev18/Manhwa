"use client";

export default function Error({ error, reset }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-accent mb-4">Something went wrong</h1>
      <p className="text-text-secondary mb-6">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={() => reset()}
        className="inline-block px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
