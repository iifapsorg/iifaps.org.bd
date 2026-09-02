import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import "overlayscrollbars/overlayscrollbars.css";

import { Providers } from "@/components/providers/Providers";
import Navbar from "@/components/public/layout/navbar/Navbar";
import Footer from "@/components/public/layout/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),

  title: {
    default: "IIFAPS",
    template: "%s | IIFAPS",
  },

  description:
    "IIFAPS is an interdisciplinary academic and research institute dedicated to the systematic exploration of Islamic intellectual traditions.",

  keywords: [
    "IIFAPS",
    "Islamic studies",
    "Islamic research",
    "Islamic scholarship",
    "Islamic intellectual traditions",
  ],

  authors: [
    {
      name: "IIFAPS",
    },
  ],

  creator: "IIFAPS",
  publisher: "IIFAPS",

  icons: {
    icon: "/images/IIFAPS-logo.webp",
  },

  openGraph: {
    title: "IIFAPS",
    description:
      "An interdisciplinary academic and research institute dedicated to the systematic exploration of Islamic intellectual traditions.",
    siteName: "IIFAPS",
    type: "website",
    images: [
      {
        url: "/images/IIFAPS-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IIFAPS",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
