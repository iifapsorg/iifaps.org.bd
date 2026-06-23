// components/shared/Button

"use client";

import { cn } from "@/utils/cn";

const Button = ({
  children = "Click !",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
  type = "button",
}) => {
  const variants = {
    primary: "after:bg-[linear-gradient(90deg,#30C5D2,#471069)]",
    secondary: "after:bg-[linear-gradient(90deg,#08203E,#557C93)]",
    success: "after:bg-[linear-gradient(90deg,#243748,#4B749F)]",
    warning: "after:bg-[linear-gradient(90deg,#fbbf24,#f59e0b)]",
    danger: "after:bg-[linear-gradient(90deg,#ef4444,#dc2626)]",
    outline: "after:bg-primary",
    ghost: "after:bg-muted",
  };

  const baseStyle = `
    relative overflow-hidden
    flex items-center justify-center
    px-5 py-2.5
    rounded-md
    font-medium
    transition-[width,opacity,color] duration-300
    border border-border
    outline-none cursor-pointer

    text-foreground
    bg-transparent

    before:absolute before:inset-0
    before:bg-transparent

    after:absolute after:left-0 after:top-0
    after:h-full after:w-0
    after:transition-all after:duration-500
    after:z-0
    hover:after:w-full

    hover:text-white
    active:scale-[0.97]
  `;

  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyle, variantClass, className)}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
