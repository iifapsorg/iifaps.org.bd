// app/page.jsx

import { Suspense } from "react";

// Components
import HeroSectionWrapper from "@/components/public/home/HeroSectionWrapper";
import LatestArticlesSection from "@/components/public/home/LatestArticlesSection";
import MostReadSection from "@/components/public/home/MostReadSection";
import FeaturedSection from "@/components/public/home/FeaturedSection";
import Subscribe from "@/components/public/home/Subscribe";

// Skeletons
import {
  BlogGridSkeleton,
  HeroSkeleton,
} from "@/components/skeleton/HomeSkeletons";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section (Immediate render or wrapped with its own skeleton) */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSectionWrapper />
      </Suspense>

      {/* 2. Latest Articles Section */}
      <Suspense fallback={<BlogGridSkeleton />}>
        <LatestArticlesSection />
      </Suspense>

      {/* 3. Most Read Articles Section */}
      <Suspense fallback={<BlogGridSkeleton />}>
        <MostReadSection />
      </Suspense>

      {/* 4. Featured Articles Section */}
      <Suspense fallback={<BlogGridSkeleton />}>
        <FeaturedSection />
      </Suspense>

      {/* 5. Newsletter Subscribe Section */}
      <Subscribe />
    </>
  );
}
