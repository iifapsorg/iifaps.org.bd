"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySlider({ images }) {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex),
    arrows: false,
  };

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl [&_.slick-slide>div]:flex [&_.slick-slide]:leading-none [&_.slick-track]:flex">
      {/* React Slick Slider */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((item) => (
          <div
            key={item.id}
            className="relative h-80 w-full sm:h-100 md:h-120 lg:h-130"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={1200}
              height={800}
              priority={item.id === 1}
              className="block h-full w-full object-cover object-center"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
          </div>
        ))}
      </Slider>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={() => sliderRef.current?.slickPrev()}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={() => sliderRef.current?.slickNext()}
        aria-label="Next image"
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
      >
        <ChevronRight size={22} />
      </button>

      {/* Custom Indicators / Dots */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => sliderRef.current?.slickGoTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeSlide === index
                ? "w-7 bg-success"
                : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
