// components/shared/Modal

"use client";

import { useEffect } from "react";
import { cn } from "@/utils/cn";
import Button from "./Button";
import { RxCross1 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-xl pt-5 pb-10 bg-white/90 dark:bg-gray-900/90 rounded-lg animate-scaleIn backdrop-blur-sm shadow-2xl">
        
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-primary">
              {title}
            </h3>

            <button
              onClick={onClose}
              className={cn(
                "absolute right-2 top-2 w-10 h-10 rounded-full flex items-center justify-center",
                "bg-gray-300 text-black hover:bg-gray-500 hover:text-gray-900",
                "transition duration-200 transform hover:rotate-180 cursor-pointer"
              )}
            >
              <RxCross1 />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-10 text-gray-700 dark:text-gray-200">
          {children}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-center gap-10">
          <Button variant="danger">Delete</Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
