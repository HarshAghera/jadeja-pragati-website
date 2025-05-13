import MainPage from "./client/mainPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - JadejaPragati",
  description:
    "Empowering businesses with compliance solutions for the modern enterprise. Navigate regulations confidently and grow with JadejaPragati.",
  keywords: [
    "JadejaPragati",
    "compliance solutions",
    "business consulting",
    "regulatory support",
    "enterprise services",
  ],
  alternates: {
    canonical: "https://www.jadejapragati.com/",
  },
  openGraph: {
    title: "Home - JadejaPragati",
    description:
      "Empowering businesses with smart compliance solutions and regulatory support.",
    url: "https://www.jadejapragati.com/",
    siteName: "JadejaPragati",
    type: "website",
    locale: "en-IN",
  },
};

export default function Page() {
  return <MainPage />;
}
