// components/shared/Text

import React from "react";
import { cn } from "@/utils/cn";

const Text = ({ children, variant = "normalText", className = "" }) => {
  const variantStyles = {
    heroHeading:
      "text-4xl md:text-6xl lg:text-8xl font-heading font-extrabold text-foreground",

    heading:
      "mx-auto mt-6 max-w-2xl text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight text-foreground",

    subHeading:
      "mx-auto mt-6 max-w-2xl text-xl md:text-2xl lg:text-3xl font-primary font-semibold leading-8 text-foreground/80",

    title:
      "mx-auto mt-6 max-w-2xl text-base md:text-lg lg:text-xl font-primary font-medium leading-8 text-foreground",

    normalText:
      "text-sm md:text-base font-primary leading-relaxed text-foreground/70",

    mediumText:
      "text-xs md:text-sm font-primary font-medium leading-relaxed text-foreground/80",

    smallText:
      "text-xs font-primary leading-normal text-foreground/60",
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
