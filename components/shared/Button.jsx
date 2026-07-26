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
    // Swapped
    primary: "before:bg-[linear-gradient(90deg,#08203E,#557C93)]",
    secondary: "before:bg-[linear-gradient(90deg,#30C5D2,#471069)]",

    success: "before:bg-[linear-gradient(90deg,#243748,#4B749F)]",
    warning: "before:bg-[linear-gradient(90deg,#fbbf24,#f59e0b)]",
    danger: "before:bg-[linear-gradient(90deg,#ef4444,#dc2626)]",

    outline: "before:bg-primary",
    ghost: "before:bg-muted",
  };

  const baseStyle = `
    relative overflow-hidden
    inline-flex items-center justify-center
    px-5 py-2.5
    rounded-md
    border border-border

    bg-transparent
    text-white
    font-medium font-secondary

    transition-all duration-300
    active:scale-[0.97]
    cursor-pointer

    before:absolute before:inset-0
    before:z-0
    before:origin-right
    before:scale-x-100
    before:transition-transform
    before:duration-500

    hover:before:scale-x-0
    hover:text-foreground

    disabled:opacity-50
    disabled:pointer-events-none
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyle, variants[variant], className)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default Button;
