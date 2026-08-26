// /category

import { notFound } from "next/navigation";
import { getCategoryBySlug, getSubcategories } from "@/services/category.service";
import { getBlogs } from "@/services/blog.service";
import BlogList from "@/components/public/blog/BlogCommonLayout";
import SubCategoryMenu from "@/components/public/category/SubCategoryMenu";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { generateMetaData } from "@/utils/generateMetaData";

export async function generateMetadata({ params }) {
    const {category} = await params;

  const getCategory = await getCategoryBySlug(category);
  if (!getCategory) return {};
  return generateMetaData({ title: getCategory.name, description: getCategory.description });
}

export default async function CategoryPage({ params }) {
    const {category} = await params;

  const getCategory = await getCategoryBySlug(category);
  if (!getCategory) notFound();

  const [subcategories, { blogs }] = await Promise.all([
    getSubcategories(getCategory._id),
    getBlogs({ getCategory: getCategory._id }),
  ]);

  return (
    <main>
      <Container className="py-12">
        <SectionTitle title={getCategory.name} subtitle={getCategory.description} />
        <SubCategoryMenu parentSlug={category} subcategories={subcategories} />
        <div className="mt-8">
          <BlogList blogs={blogs} />
        </div>
      </Container>
    </main>
  );
}
