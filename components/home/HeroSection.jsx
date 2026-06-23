import Image from "next/image";
import Text from "@/components/shared/Text";
import Subscribe from "@/components/home/Subscribe";


export default function HeroSection() {
  return (
    <section className="relative">
      <Image
        src="/images/hero-bg.jpg"
        alt="Hero Background"
        width={1792}
        height={1024}
        priority
        className="w-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-3xl text-center px-4">
          <Text variant="heroHeading" className="">
            Transform Ideas Into Reality
          </Text>

          {/*  ===== btn group ===== */}
          {/* <Button variant="primary">Primary</Button> */}
          <Subscribe></Subscribe>
        </div>
      </div>
    </section>
  );
}
