"use client";

import { useEffect } from "react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold">Something went wrong!</h1>

      <p className="mt-4 max-w-md text-gray-600">
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-md bg-black px-6 py-3 text-white transition hover:opacity-90"
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;