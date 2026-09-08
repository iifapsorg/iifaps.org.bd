// components/public/home/HeroSectionWrapper.jsx

import HeroSection from "@/components/public/home/HeroSection";
import { getBlogs } from "@/services/blog.service";

export default async function HeroSectionWrapper() {
  // Fetch blogs specific to Hero section
  const { blogs = [] } = await getBlogs({ limit: 3 });

  if (!blogs.length) return null;

  return <HeroSection latestArticles={blogs} />;
}