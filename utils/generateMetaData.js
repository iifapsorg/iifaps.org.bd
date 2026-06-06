const siteConfig = {
  name: "My Blog",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://myblog.com",
  description: "A blog about everything",
  twitterHandle: "@myblog",
};

/**
 * Generate Next.js metadata for a page
 */
export function generateMetaData({
  title,
  description,
  image,
  type = "website",
  noIndex = false,
} = {}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDesc = description || siteConfig.description;
  const ogImage = image || `${siteConfig.url}/og-default.png`;

  return {
    title: fullTitle,
    description: metaDesc,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      title: fullTitle,
      description: metaDesc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      type,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDesc,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

/**
 * Generate blog post metadata
 */
export function generateBlogMetaData(blog) {
  return generateMetaData({
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: blog.thumbnail,
    type: "article",
  });
}
