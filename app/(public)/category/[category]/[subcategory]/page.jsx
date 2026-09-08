// app/category/[category]/[subcategory]/page.jsx

import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/services/category.service";
import { getBlogs } from "@/services/blog.service";

import BlogList from "@/components/public/blog/BlogCommonLayout";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

export default async function SubCategoryPage({ params }) {
  const { category, subcategory } = await params;

  const [parent, subCategory] = await Promise.all([
    getCategoryBySlug(category),
    getCategoryBySlug(subcategory),
  ]);

  if (!parent || !subCategory) {
    notFound();
  }

  const { blogs } = await getBlogs({
    category: subcategory,
  });

  return (
    <main>
      <Container className="py-12">
        <p className="mb-1 text-sm text-gray-400">{parent.name} /</p>

        <SectionTitle
          title={subCategory.name}
          subtitle={subCategory.description}
        />

        <BlogList blogs={blogs} />
      </Container>
    </main>
  );
}
