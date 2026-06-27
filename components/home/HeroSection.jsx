"use client";

import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Blur */}
      <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/10" />
      <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10" />

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Text variant="heroHeading">
            Explore Our{" "}
            <span className="bg-linear-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Categories
            </span>
          </Text>

          <Text variant="title" className="mx-auto">
            Discover a wide range of thoughtfully organized categories to help
            you find exactly what you need—quickly, easily, and beautifully.
          </Text>

          <div className="mt-10">
            <Link href="/categories">
              <Button variant="primary" className="inline-flex">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
