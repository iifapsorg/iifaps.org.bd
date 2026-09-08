"use client";

import { Suspense } from "react";

import { ThemeProvider } from "./ThemeProvider";
import { ScrollProvider } from "./ScrollProvider";
import { NavigationProvider } from "./NavigationProvider";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <NavigationProvider>
          <ScrollProvider className="h-screen">{children}</ScrollProvider>
        </NavigationProvider>
      </Suspense>
    </ThemeProvider>
  );
}
