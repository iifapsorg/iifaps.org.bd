import HeroSection from "@/components/home/HeroSection";
import BlogCommonLayout from "@/components/blog/BlogCommonLayout";
import { getBlogs } from "@/services/blog.service";

const Home = async () => {
  const ARTICLE_LIMIT = 3;
  const { blogs: latestArticles, total: latestTotal } = await getBlogs({
    limit: ARTICLE_LIMIT,
  });
  const { blogs: mostReadArticles, total: mostReadTotal } = await getBlogs({
    limit: ARTICLE_LIMIT,
    sortBy: "views",
  });
  const { blogs: featuredArticles, total: featuredTotal } = await getBlogs({
    featured: true,
    limit: ARTICLE_LIMIT,
  });

  return (
    <div className="">
      <HeroSection></HeroSection>

      {/* ======= latest articles ===== */}
      <BlogCommonLayout
        blogs={latestArticles}
        sectionHeading="Latest Articles"
        limit={ARTICLE_LIMIT}
        total={latestTotal}
        currentType="latest"
      ></BlogCommonLayout>

      {/* ======= most read articles ===== */}
      <BlogCommonLayout
        blogs={mostReadArticles}
        sectionHeading="Most Read Articles"
        limit={ARTICLE_LIMIT}
        total={mostReadTotal}
        currentType="most-read"
      ></BlogCommonLayout>

      {/* ======= featured articles ===== */}
      <BlogCommonLayout
        blogs={featuredArticles}
        sectionHeading="Featured Articles"
        limit={ARTICLE_LIMIT}
        total={featuredTotal}
        currentType="featured"
      ></BlogCommonLayout>
    </div>
  );
};

export default Home;
