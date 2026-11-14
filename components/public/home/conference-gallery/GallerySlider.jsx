// "use client";
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySlider({ images = [] }) {
  const [activeSlide, setActiveSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const hasMultipleSlides = images.length > 1;

  // Clone last and first slides for seamless infinite looping
  const slides = hasMultipleSlides
    ? [images[images.length - 1], ...images, images[0]]
    : images;

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
    if (!hasMultipleSlides) return;

    const timer = setInterval(goNext, 5000);

    return () => clearInterval(timer);
  }, [goNext, hasMultipleSlides]);

  // Reset cloned slides without animation
  useEffect(() => {
    if (transitionEnabled) return;

    const frame = requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return;

    if (activeSlide === 0) {
      setTransitionEnabled(false);
      setActiveSlide(images.length);
    }

    if (activeSlide === images.length + 1) {
      setTransitionEnabled(false);
      setActiveSlide(1);
    }
  };

  const currentIndex =
    images.length > 0
      ? (activeSlide - 1 + images.length) % images.length
      : 0;

  if (!images.length) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Latest conference images"
      className="group relative w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
    >
      {/* Slides */}
      <div
        className="flex"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${activeSlide * 100}%)`,
          transition: transitionEnabled
            ? "transform 500ms ease-in-out"
            : "none",
        }}
      >
        {slides.map((item, index) => {
          const isFirstRealSlide =
            hasMultipleSlides ? index === 1 : index === 0;

          return (
            <div
              key={`${item.id}-${index}`}
              aria-hidden={
                hasMultipleSlides &&
                (index === 0 || index === images.length + 1)
              }
              className="relative h-80 w-full shrink-0 sm:h-100 md:h-120 lg:h-130"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                priority={isFirstRealSlide}
                loading={isFirstRealSlide ? "eager" : "lazy"}
                quality={75}
                className="object-cover object-center"
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
            </div>
          );
        })}
      </div>

      {hasMultipleSlides && (
        <>
          {/* Previous */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            <ChevronRight size={22} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-3 py-2">
            {images.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentIndex === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-5 bg-white"
                    : "w-2 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

