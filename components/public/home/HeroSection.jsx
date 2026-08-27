// components/home/HeroSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Container from "@/components/shared/Container";
import Text from "../../shared/Text";

function PrevArrow({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Previous article"
      onClick={onClick}
      className="
        absolute left-2 top-1/2 z-20
        flex h-10 w-10 -translate-y-1/2 items-center justify-center
        rounded-full border border-white/20
        bg-black/30 text-white
        backdrop-blur-md
        transition-all duration-300
        hover:scale-105 hover:bg-black/50
        sm:left-4 sm:h-11 sm:w-11
        lg:left-10
      "
    >
      <ChevronLeft size={22} strokeWidth={1.8} />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Next article"
      onClick={onClick}
      className="
        absolute right-2 top-1/2 z-20
        flex h-10 w-10 -translate-y-1/2 items-center justify-center
        rounded-full border border-white/20
        bg-black/30 text-white
        backdrop-blur-md
        transition-all duration-300
        hover:scale-105 hover:bg-black/50
        sm:right-4 sm:h-11 sm:w-11
        lg:right-10
      "
    >
      <ChevronRight size={22} strokeWidth={1.8} />
    </button>
  );
}

const HeroSection = ({ latestArticles = [] }) => {
  const articles = latestArticles.slice(0, 5);

  if (!articles.length) {
    return null;
  }

  const settings = {
    dots: true,
    arrows: true,
    infinite: articles.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    swipe: true,
    adaptiveHeight: false,

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,

    appendDots: (dots) => (
      <div className="hero-slider-dots">
        <ul className="">{dots}</ul>
        <p className="blackColor">hello</p>
      </div>
    ),

    customPaging: () => (
      <button
        type="button"
        aria-label="Go to slide"
        className="
          h-2 w-2 rounded-full
          bg-white/50
          transition-all duration-300
        "
      />
    ),

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          autoplaySpeed: 4500,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: true,
          autoplaySpeed: 4000,
        },
      },
    ],
  };

  return (
    <section className="hero-slider relative w-full overflow-hidden bg-black">
      <Slider {...settings}>
        {articles.map((article) => {
          const category =
            typeof article.category === "string"
              ? article.category
              : article.category?.name || "Uncategorized";

          const author =
            typeof article.author === "string"
              ? article.author
              : article.author?.name || "IIFAPS Institute";

          const image =
            article.thumbnail ||
            article.image ||
            article.coverImage ||
            "/images/placeholder.webp";

          return (
            <article
              key={article._id?.toString() || article.slug}
              className="relative h-screen outline-none"
            >
              {/* ================= IMAGE ================= */}
              <div className="absolute inset-0">
                <Image
                  src={image}
                  alt={article.title || "Article image"}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* ================= OVERLAY ================= */}
              <div
                className="
                  absolute inset-0
                  bg-linear-to-t
                  from-black/90
                  via-black/35
                  to-black/10
                "
              />

              {/* ================= ARTICLE INFO ================= */}
              <Container className="relative z-10 flex h-full items-end">
                <div
                  className="
                    w-full
                    pb-15
                    pt-24
                    text-white
                  "
                >
                  <div className="max-w-4xl">
                    {/* Category */}
                    <Link
                      href={`/categories/${article.category?.slug || ""}`}
                      className="
                        bg-black/60 p-2 rounded-md
                        text-xs font-semibold uppercase tracking-[0.18em]
                        text-white/80
                        transition-colors duration-200
                        hover:text-white
                        sm:text-sm
                      "
                    >
                      {category}
                    </Link>

                    {/* Title */}
                    <Link href={`/blogs/${article.slug}`} className="block">
                      <Text
                        variant="sectionHeading"
                        className="mt-5 ml-0 line-clamp-2 text-white"
                      >
                        {article.title}
                      </Text>
                    </Link>

                    {/* Author */}
                    <Text className="mt-5 text-white flex items-center gap-2 ">
                      <span className="h-px w-7 bg-white/50" />
                      <span>By {author}</span>
                    </Text>
                  </div>
                </div>
              </Container>
            </article>
          );
        })}
      </Slider>
    </section>
  );
};

export default HeroSection;
