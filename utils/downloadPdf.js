// utils/downloadPdf.js

export const downloadPdf = async ({ element, filename = "document.pdf" }) => {
  if (!element) {
    console.error("PDF element not found.");
    return;
  }

  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  // Hide download button
  const downloadButton = element.querySelector("#downloadPDFbtn");
  const originalOpacity = downloadButton?.style.opacity;

  if (downloadButton) {
    downloadButton.style.opacity = "0";
  }

  // Add PDF-specific styles
  element.classList.add("pdf-export");

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // A4 dimensions
    const pageWidth = 210;
    const pageHeight = 297;

    // PDF margins
    const marginTop = 15;
    const marginRight = 15;
    const marginBottom = 15;
    const marginLeft = 15;

    // Content area
    const contentWidth = pageWidth - marginLeft - marginRight;
    const contentHeight = pageHeight - marginTop - marginBottom;

    // Canvas height that fits into one PDF page
    const pageCanvasHeight = (contentHeight * canvas.width) / contentWidth;

    let renderedHeight = 0;
    let pageNumber = 0;

    while (renderedHeight < canvas.height) {
      const remainingHeight = canvas.height - renderedHeight;

      const currentPageHeight = Math.min(pageCanvasHeight, remainingHeight);

      // Create canvas for current PDF page
      const pageCanvas = document.createElement("canvas");

      pageCanvas.width = canvas.width;
      pageCanvas.height = currentPageHeight;

      const context = pageCanvas.getContext("2d");

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      // Crop current section from full canvas
      context.drawImage(
        canvas,
        0,
        renderedHeight,
        canvas.width,
        currentPageHeight,
        0,
        0,
        canvas.width,
        currentPageHeight,
      );

      const pageImage = pageCanvas.toDataURL("image/jpeg", 0.98);

      // Calculate image height for current page
      const currentImageHeight =
        (currentPageHeight * contentWidth) / canvas.width;

      if (pageNumber > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        pageImage,
        "JPEG",
        marginLeft,
        marginTop,
        contentWidth,
        currentImageHeight,
      );

      renderedHeight += currentPageHeight;
      pageNumber++;
    }

    pdf.save(filename);
  } catch (error) {
    console.error("PDF generation failed:", error);
  } finally {
    // Remove PDF-specific styles
    element.classList.remove("pdf-export");

    // Restore download button
    if (downloadButton) {
      downloadButton.style.opacity = originalOpacity;
    }
  }
};
