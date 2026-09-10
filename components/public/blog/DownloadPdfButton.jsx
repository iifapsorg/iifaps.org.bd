"use client";

import { useState } from "react";
import Button from "@/components/shared/Button";
import { downloadPdf } from "@/utils/downloadPdf";

export default function DownloadPdfButton({ slug }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = document.querySelector("#blog-pdf-content");

    if (!element) {
      console.error("Blog content not found.");
      return;
    }

    try {
      setIsDownloading(true);

      const filename = `${slug || "blog"}.pdf`;

      await downloadPdf({
        element,
        filename,
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      id="downloadPDFbtn"
      variant="success"
      onClick={handleDownload}
      disabled={isDownloading}
    >
      {isDownloading ? "Generating..." : "Download PDF"}
    </Button>
  );
}
