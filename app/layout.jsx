import "./globals.css";

import { Providers } from "@/components/providers/Providers";
import Navbar from "@/components/public/layout/navbar/Navbar";
import Footer from "@/components/public/layout/footer/Footer";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  ),

  title: {
    default: "CAPS",
    template: "%s | CAPS",
  },

  description:
    "To advance Islamic intellectual inquiry and empower Muslims to critically engage with Islam and modernity, intellectual history, political thought, and methodological question.",

  keywords: [
    "CAPS",
    "Islamic studies",
    "Islamic research",
    "Islamic scholarship",
    "Islamic intellectual traditions",
  ],

  authors: [{ name: "CAPS" }],
  creator: "CAPS",
  publisher: "CAPS",

  icons: {
    icon: "/images/CAPS-logo.png",
  },

  openGraph: {
    title: "CAPS",
    description:
      "To advance Islamic intellectual inquiry and empower Muslims to critically engage with Islam and modernity, intellectual history, political thought, and methodological question.",
    siteName: "CAPS",
    type: "website",
    images: [
      {
        url: "/images/CAPS-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CAPS",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
