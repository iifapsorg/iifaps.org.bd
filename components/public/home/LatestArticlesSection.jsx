// components/public/home/LatestArticlesSection.jsx

import BlogCommonLayout from "@/components/public/blog/BlogCommonLayout";
import { getBlogs } from "@/services/blog.service";

export default async function LatestArticlesSection() {
  // Fetch latest 3 blogs
  const { blogs = [] } = await getBlogs({ limit: 3 });

  if (!blogs.length) return null;

  return (
    <BlogCommonLayout
      blogs={blogs}
      sectionHeading="Latest Articles"
      currentType="latest"
      cardProps={{
        showsummary: false,
        showReadMore: true,
      }}
    />
  );
}