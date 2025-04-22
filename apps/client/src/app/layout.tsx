import type { Metadata } from "next";
// import { Baloo_Bhai_2 } from "next/font/google";
import { Inter } from "next/font/google"; // Import Inter font
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Baloo Bhai font
// const Baloo_Bhai = Baloo_Bhai_2({
//   subsets: ["latin"],
//   display: "swap",
// });

// Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
      <body className={` ${inter.className} `}>
        {" "}
        {/* Combine both fonts */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
