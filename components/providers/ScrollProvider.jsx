"use client";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export function ScrollProvider({ children, className = "", }) {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: "leave",
          autoHideDelay: 500,
          theme: "os-theme-dark",
        },
      }}
      defer
      className={className}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}