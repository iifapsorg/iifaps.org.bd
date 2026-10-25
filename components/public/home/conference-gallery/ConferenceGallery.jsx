import GallerySlider from "./GallerySlider";
import { galleryConfig } from "@/config/index/gallery.config";
import Text from "@/components/shared/Text";

export default function ConferenceGallery() {
  const { title, images } = galleryConfig;

  return (
    <section className="relative overflow-hidden bg-background pb-10 text-foreground transition-colors duration-200 md:pb-15">
      {/* Background Subtle Ambient Light Effect */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Section Heading */}
          <Text variant="sectionHeading" className="my-8 capitalize">
            {title}
          </Text>
        </div>

        {/* Gallery Slider Wrapper */}
        <div className="mx-auto mt-3 md:mt-5 lg:mt-8 max-w-5xl">
          <GallerySlider images={images} />
        </div>
      </div>
    </section>
  );
}
