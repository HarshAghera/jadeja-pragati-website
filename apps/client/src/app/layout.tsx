import type { Metadata } from "next";
import { Baloo_Bhai_2 } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const Baloo_Bhai = Baloo_Bhai_2({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Baloo_Bhai_2({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jadeja Pragati",
  description: "Recycling & Compliance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Baloo_Bhai.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
