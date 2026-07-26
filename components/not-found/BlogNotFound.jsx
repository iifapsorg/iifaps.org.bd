// components/not-found/BlogNotFound

"use client";

import Link from "next/link";
import { ArrowLeft, FileSearch, BookX } from "lucide-react";

import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

export default function BlogNotFound() {
  return (
    <section className="relative overflow-hidden py-5">
      <Container>
        <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-background/80 p-8 text-center shadow-xl backdrop-blur md:p-10">
            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FileSearch className="h-10 w-10" />
            </div>

            {/* Heading */}
            <Text variant="sectionHeading" className="mt-8">
              Blog Not Found
            </Text>

            {/* Info */}
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border bg-muted/40 p-5 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookX className="h-5 w-5" />
              </div>

              <Text variant="mediumText">
                Browse our latest articles or return to the homepage to discover
                more useful content.
              </Text>
            </div>

            {/* Actions */}
            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              <Link href="/blogs">
                <Button className="w-full px-6 py-3">Browse Blogs</Button>
              </Link>

              <Link href="/">
                <Button variant="secondary" className="w-full gap-2 px-6 py-3">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
