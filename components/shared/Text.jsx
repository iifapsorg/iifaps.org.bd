// components/shared/Text

import React from "react";
import { cn } from "@/utils/cn";

const Text = ({ children, variant = "normalText", className = "" }) => {
  const variantStyles = {
    heroHeading:
      "text-4xl md:text-6xl lg:text-8xl font-inter font-bold leading-tight tracking-tight text-foreground",

    heading:
      "text-3xl md:text-4xl lg:text-5xl font-inter font-bold leading-tight tracking-tight text-foreground",

    subHeading:
      "text-xl md:text-2xl lg:text-3xl font-inter font-semibold leading-snug text-foreground/80",

    title:
      "text-base md:text-lg lg:text-xl font-inter font-semibold leading-snug text-foreground",

    normalText:
      "text-sm md:text-base font-poppins leading-relaxed text-foreground/70",

    mediumText:
      "text-xs md:text-sm font-poppins font-medium leading-relaxed text-foreground/80",

    smallText:
      "text-xs font-poppins leading-normal text-foreground/60",
  };

  const variantTags = {
    heroHeading: "h1",
    heading: "h1",
    subHeading: "h2",
    title: "h3",
    normalText: "p",
    mediumText: "p",
    smallText: "span",
  };

  const Component = variantTags[variant] || "p";

  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  );
};

export default Text;
