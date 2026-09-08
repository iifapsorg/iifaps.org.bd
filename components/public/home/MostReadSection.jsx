// components/public/home/MostReadSection.jsx

import BlogCommonLayout from "@/components/public/blog/BlogCommonLayout";
import { getBlogs } from "@/services/blog.service";

export default async function MostReadSection() {
  // Fetch top 6 most read blogs sorted by views
  const { blogs = [] } = await getBlogs({
    limit: 6,
    sortBy: "views",
  });

  if (!blogs.length) return null;

  return (
    <BlogCommonLayout
      blogs={blogs}
      sectionHeading="Most Read Articles"
      currentType="most-read"
    />
  );
}