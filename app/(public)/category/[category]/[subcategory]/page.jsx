// /category/[category]/[subcategory]/page

import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/services/category.service";
import { getBlogs } from "@/services/blog.service";
import BlogList from "@/components/blog/BlogCommonLayout";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

export default async function SubCategoryPage({ params }) {
  const [parent, subcategory] = await Promise.all([
    getCategoryBySlug(params.category),
    getCategoryBySlug(params.subcategory),
  ]);

  if (!parent || !subcategory) notFound();

  const { blogs } = await getBlogs({ category: subcategory._id });

  return (
    <main>
      <Container className="py-12">
        <p className="text-sm text-gray-400 mb-1">{parent.name} /</p>
        <SectionTitle title={subcategory.name} subtitle={subcategory.description} />
        <BlogList blogs={blogs} />
      </Container>
    </main>
  );
}
