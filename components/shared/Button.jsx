// components/shared/Button.jsx

"use client";

import { cn } from "@/utils/cn";

const variants = {
  primary: `
    text-white
    before:bg-[linear-gradient(90deg,#08203E,#557C93)]
    hover:text-foreground
  `,

  secondary: `
    text-white
    before:bg-[linear-gradient(90deg,#30C5D2,#471069)]
    hover:text-foreground
  `,

  success: `
    text-white
    before:bg-[linear-gradient(90deg,#166534,#22C55E)]
    hover:text-foreground
  `,

  warning: `
    border-amber-500/30
    bg-amber-500
    text-white
    shadow-sm shadow-amber-500/20
    hover:bg-amber-600
    hover:border-amber-600
    hover:shadow-md hover:shadow-amber-500/25
  `,

  danger: `
    border-red-500/30
    bg-red-500
    text-white
    shadow-sm shadow-red-500/20
    hover:bg-red-600
    hover:border-red-600
    hover:shadow-md hover:shadow-red-500/25
  `,

  outline: `
    border-border
    bg-transparent
    text-foreground
    hover:bg-muted
    hover:border-foreground/20
  `,

  ghost: `
    border-border
    bg-muted/40
    text-foreground
    hover:bg-muted
    hover:text-foreground
  `,
};

const animatedVariants = ["primary", "secondary", "success"];

const baseStyle = `
  relative
  inline-flex
  min-h-10
  items-center
  justify-center
  overflow-hidden
  rounded-md
  border
  px-5
  py-2.5
  font-secondary
  text-sm
  font-medium
  tracking-tight

  transition-all
  duration-300
  ease-out

  active:scale-[0.98]

  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2
  focus-visible:ring-offset-background

  disabled:pointer-events-none
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

const beforeEffect = `
  before:absolute
  before:inset-0
  before:z-0
  before:origin-right
  before:scale-x-100
  before:transition-transform
  before:duration-500
  before:ease-out
  hover:before:scale-x-0
`;

export default function Button({
  children = "Click!",
  variant = "primary",
  className,
  disabled = false,
  onClick,
  type = "button",
}) {
  const isAnimated = animatedVariants.includes(variant);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyle,

        isAnimated && beforeEffect,

        variants[variant] ?? variants.primary,

        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
