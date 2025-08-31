import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./components/header";
import PageLoader from "./components/pageLoader";
import ToastProvider from "./toast-provider";
import LenisProvider from "./components/lenis_provider";

const slab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jadeja Pragati - Recycling & Compliance Solutions",
  description:
    "JadejaPragati offers innovative compliance and recycling solutions to help businesses meet regulatory requirements in India.",
  icons: {
    icon: "/pictures/icon.webp",
  },
  keywords: [
    "JadejaPragati",
    "recycling solutions",
    "compliance",
    "business compliance India",
    "regulatory solutions",
    "environmental solutions",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.jadejapragati.com/",
  },
  openGraph: {
    title: "Jadeja Pragati - Compliance & Recycling",
    description:
      "JadejaPragati provides comprehensive compliance solutions for businesses in India, helping them navigate complex regulatory requirements.",
    url: "https://www.jadejapragati.com/",
    siteName: "JadejaPragati",
    type: "website",
    locale: "en-IN",
    images: [
      {
        url: "https://www.jadejapragati.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jadeja Pragati - Compliance Solutions",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={slab.className}>
        {/* ✅ Smooth scroll wrapper */}
        <LenisProvider>
          <ToastProvider />
          <Header />
          <PageLoader>{children}</PageLoader>

          {/* WhatsApp Floating Button */}
          <Link
            href="https://wa.me/7202096968"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-50 bg-[#25D366] hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
          >
            <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>

          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
