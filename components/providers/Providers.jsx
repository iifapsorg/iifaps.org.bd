"use client";

import { ThemeProvider } from "./ThemeProvider";
import { ScrollProvider } from "./ScrollProvider";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <ScrollProvider className="h-screen">{children}</ScrollProvider>
    </ThemeProvider>
  );
}