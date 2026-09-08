// components/public/home/FeaturedSection.jsx

import BlogCommonLayout from "@/components/public/blog/BlogCommonLayout";
import { getBlogs } from "@/services/blog.service";

export default async function FeaturedSection() {
  // Fetch 3 featured blogs
  const { blogs = [] } = await getBlogs({
    limit: 3,
    featured: true,
  });

  if (!blogs.length) return null;

  return (
    <BlogCommonLayout
      blogs={blogs}
      sectionHeading="Featured Articles"
      currentType="featured"
      cardProps={{
        showsummary: true,
        showReadMore: true,
      }}
    />
  );
}