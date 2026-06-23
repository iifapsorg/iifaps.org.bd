import Link from "next/link";

export default function VerifiedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center rounded-2xl border p-8 shadow-sm">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl font-bold mb-3">
          Email Verified
        </h1>

        <p className="text-muted-foreground mb-6">
          Thank you for confirming your email address.
          You have successfully subscribed to our newsletter.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-primary text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}