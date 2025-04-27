import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";


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
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
