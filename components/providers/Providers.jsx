"use client";

import { Suspense } from "react";

import { ThemeProvider } from "./ThemeProvider";
import { ScrollProvider } from "./ScrollProvider";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <ScrollProvider className="h-screen">{children}</ScrollProvider>
      </Suspense>
    </ThemeProvider>
  );
}
