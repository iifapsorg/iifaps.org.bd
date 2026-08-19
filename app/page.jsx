import HeroSection from "@/components/home/HeroSection";
import Subscribe from "@/components/home/Subscribe";
import BlogCommonLayout from "@/components/blog/BlogCommonLayout";
import { getBlogs } from "@/services/blog.service";

const Home = async () => {
  const [
    { blogs: latestArticles },
    { blogs: mostReadArticles },
    { blogs: featuredArticles },
  ] = await Promise.all([
    getBlogs({ limit: 3 }),
    getBlogs({
      limit: 6,
      sortBy: "views",
    }),
    getBlogs({
      limit: 3,
      featured: true,
    }),
  ]);

  return (
    <>
      {/* === hero section === */}
      <HeroSection latestArticles={latestArticles} />

      {/* Latest Articles */}
      <BlogCommonLayout
        blogs={latestArticles}
        sectionHeading="Latest Articles"
        currentType="latest"
        cardProps={{
          showExcerpt: false,
          showReadMore: true,
        }}
      />

      {/* Most Read Articles */}
      <BlogCommonLayout
        blogs={mostReadArticles}
        sectionHeading="Most Read Articles"
        currentType="most-read"
      />

      {/* Featured Articles */}
      <BlogCommonLayout
        blogs={featuredArticles}
        sectionHeading="Featured Articles"
        currentType="featured"
        cardProps={{
          showExcerpt: true,
          showReadMore: true,
        }}
      />

      {/*  === subscribe === */}
      <Subscribe />
    </>
  );
};

export default Home;
