import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-md bg-black px-6 py-3 text-white transition hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;