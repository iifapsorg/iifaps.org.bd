"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // handle subscribe
  const handleSubscribe = async () => {
    setMessage("");

    if (!email) {
      setMessage("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setMessage(data.message);
      setEmail("");
    } catch (error) {
      setMessage("Server error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-15 bg-secondary">
      <Container>
        <div className="flex flex-col items-center gap-8">
          <Text variant="sectionHeading" className="text-center">Subscribe for Weekly Updates</Text>

          <div className="flex flex-col gap-4 md:flex-row w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md"
            />

            <Button onClick={handleSubscribe} disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>

          {message && (
            <p className="text-sm text-center text-gray-600">{message}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
