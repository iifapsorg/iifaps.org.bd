import Image from "next/image";
import logo from "@/public/images/IIFAPS-logo.webp";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <Image
        src={logo}
        alt="IIFAPS Logo"
        priority
        className="h-25 w-25 rounded-md animate-pulse sm:h-30 sm:w-30 md:h-40 md:w-40 lg:h-50 lg:w-50"
      />
    </div>
  );
};

export default Loading;
