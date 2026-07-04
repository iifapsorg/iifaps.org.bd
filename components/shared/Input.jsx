// components/shared/Input

"use client";

import { cn } from "@/utils/cn";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  name,
  id,
  className,
}) => {
  return (
    <div className={cn("w-full mb-4", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          "w-full px-4 py-2 border border-gray-300 rounded-md",
          "focus:outline-none focus:ring focus:ring-indigo-100",
          "bg-white text-gray-900 placeholder-gray-400",
          "transition",
          "disabled:bg-gray-100 disabled:cursor-not-allowed"
        )}
      />

    </div>
  );
};

export default Input;