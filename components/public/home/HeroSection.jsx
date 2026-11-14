// components/home/HeroSection.jsx
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";

const HeroSection = ({ latestArticles = [] }) => {
  const articles = latestArticles.slice(0, 5);

  const hasMultipleSlides = articles.length > 1;

  const [activeSlide, setActiveSlide] = useState(hasMultipleSlides ? 1 : 0);

  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Navigation
  const goNext = useCallback(() => {
    if (hasMultipleSlides) {
      setActiveSlide((current) => current + 1);
    }
  }, [hasMultipleSlides]);

  const goPrev = useCallback(() => {
    if (hasMultipleSlides) {
      setActiveSlide((current) => current - 1);
    }
  }, [hasMultipleSlides]);

  const goToSlide = useCallback((index) => {
    setActiveSlide(index + 1);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!hasMultipleSlides || isPaused) return;

    const timer = setInterval(goNext, 5000);

    return () => clearInterval(timer);
  }, [goNext, hasMultipleSlides, isPaused]);

  // Restore transition after infinite-loop reset
  useEffect(() => {
    if (transitionEnabled) return;

    const frame = requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  if (!articles.length) return null;

  // Clone first and last slides for infinite loop
  const slides = hasMultipleSlides
    ? [articles[articles.length - 1], ...articles, articles[0]]
    : articles;

  // Handle infinite loop
  const handleTransitionEnd = (event) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "transform"
    ) {
      return;
    }

    if (activeSlide === 0) {
      setTransitionEnabled(false);
      setActiveSlide(articles.length);
    }

    if (activeSlide === articles.length + 1) {
      setTransitionEnabled(false);
      setActiveSlide(1);
    }
  };

  // Current real article index
  const currentIndex = hasMultipleSlides
    ? (activeSlide - 1 + articles.length) % articles.length
    : 0;

  const trackPosition = hasMultipleSlides ? activeSlide : 0;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured articles"
      className="hero-slider relative h-[80vh] min-h-112.5 w-full overflow-hidden bg-black md:h-[calc(100vh-55px)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      {/* ================= SLIDES ================= */}

      <div
        className="flex h-full"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${trackPosition * 100}%)`,
          transition: transitionEnabled
            ? "transform 600ms ease-in-out"
            : "none",
        }}
      >
        {slides.map((article, index) => {
          const isFirstRealSlide = hasMultipleSlides
            ? index === 1
            : index === 0;

          const category =
            typeof article.category === "string"
              ? article.category
              : article.category?.name || "Uncategorized";

          const categorySlug =
            typeof article.category === "object" ? article.category?.slug : "";

          const author =
            typeof article.author === "string"
              ? article.author
              : article.author?.name || "CAPS Institute";

          const image =
            article.thumbnail ||
            article.image ||
            article.coverImage ||
            "/images/placeholder.webp";

          const articleKey = article._id?.toString?.() || article.slug || index;

          return (
            <article
              key={`${articleKey}-${index}`}
              aria-hidden={index !== activeSlide}
              aria-roledescription="slide"
              aria-label={`${((index - (hasMultipleSlides ? 1 : 0) + articles.length) % articles.length) + 1} of ${articles.length}`}
              inert={index !== activeSlide}
              className="relative h-full w-full shrink-0 overflow-hidden outline-none"
            >
              {/* ================= IMAGE ================= */}

              <div className="absolute inset-0">
                <Image
                  src={image}
                  alt={article.title || "Featured article image"}
                  fill
                  sizes="100vw"
                  preload={isFirstRealSlide}
                  quality={75}
                  className="object-cover object-center"
                />
              </div>

              {/* ================= OVERLAY ================= */}

              <div
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-linear-to-t
                  from-black/70
                  via-black/25
                  to-black/60
                "
              />

              {/* ================= ARTICLE INFO ================= */}

              <Container className="relative z-10 flex h-full items-end">
                <div className="w-full pb-5 pl-10 md:pl-17 text-white">
                  <div className="max-w-4xl pb-8 md:pb-10 lg:pb-15">
                    {/* Category */}

                    <Link
                      href={`/categories/${categorySlug || ""}`}
                      tabIndex={index === activeSlide ? 0 : -1}
                      className="
                        inline-block
                        rounded-md
                        bg-black/60
                        p-2
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-white/90
                        transition-colors
                        hover:text-white
                        sm:text-sm
                      "
                    >
                      {category}
                    </Link>

                    {/* Title */}

                    <Link
                      href={`/blogs/${article.slug}`}
                      tabIndex={index === activeSlide ? 0 : -1}
                      className="block"
                    >
                      <Text
                        variant="sectionHeading"
                        className="
                          mt-5
                          ml-0
                          line-clamp-2
                          text-white
                          dark:text-white
                          lg:line-clamp-2
                        "
                      >
                        {article.title}
                      </Text>
                    </Link>

                    {/* Author */}

                    <Text className="mt-5 flex items-center gap-2 text-white">
                      <span className="h-px w-7 bg-white/50" />
                      <span>By {author}</span>
                    </Text>
                  </div>
                </div>
              </Container>
            </article>
          );
        })}
      </div>

      {/* ================= NAVIGATION ================= */}

      {hasMultipleSlides && (
        <>
          {/* Previous */}

          <button
            type="button"
            aria-label="Previous article"
            onClick={goPrev}
            className="
              absolute
              left-2
              top-1/2
              z-20
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/40
              text-white
              backdrop-blur-md
              transition-colors
              hover:bg-black/60
              sm:left-4
              sm:h-11
              sm:w-11
              lg:left-10
            "
          >
            <ChevronLeft size={22} strokeWidth={1.8} />
          </button>

          {/* Next */}

          <button
            type="button"
            aria-label="Next article"
            onClick={goNext}
            className="
              absolute
              right-2
              top-1/2
              z-20
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/40
              text-white
              backdrop-blur-md
              transition-colors
              hover:bg-black/60
              sm:right-4
              sm:h-11
              sm:w-11
              lg:right-10
            "
          >
            <ChevronRight size={22} strokeWidth={1.8} />
          </button>

          {/* ================= INDICATORS ================= */}

          <div
            className="
              absolute
              bottom-6
              left-1/2
              z-20
              flex
              -translate-x-1/2
              items-center
              gap-2
              rounded-full
              bg-black/50
              px-3
              py-2
              backdrop-blur-md
            "
          >
            {articles.map((article, index) => (
              <button
                key={article._id?.toString?.() || article.slug || index}
                type="button"
                aria-label={`Go to article ${index + 1}: ${article.title}`}
                aria-current={currentIndex === index ? "true" : undefined}
                onClick={() => goToSlide(index)}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    currentIndex === index
                      ? "w-5 bg-white"
                      : "w-2 bg-white/50 hover:bg-white"
                  }
                `}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
