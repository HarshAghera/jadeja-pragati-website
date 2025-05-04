import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jadeja Pragati",
  description: "Recycling & Compliance",
  icons: {
    icon: "/icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#0f2557", 
              color: "white", 
              borderRadius: "8px", 
              padding: "12px", 
              fontSize: "16px",
            },
          }}
        />
        <Header />
        {children}
        <Footer />
        <Link
          href="https://wa.me/1111111111"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 bg-[#25D366] hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        >
          <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
      </body>
    </html>
  );
}
