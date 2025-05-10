import type { Metadata } from "next";
import Getintouch from "../client/components/contactPage/getInTouch";
import MapContact from "../client/components/contactPage/mapContact";

export const metadata: Metadata = {
  title: "Contact Us | Jadeja Pragati",
  description:
    "Reach out to Jadeja Pragati for collaborations, business inquiries, or feedback. Let's connect and grow together.",
  keywords: [
    "Jadeja Pragati contact",
    "Get in touch with Jadeja Pragati",
    "Jadeja Pragati collaboration",
    "Business inquiries Jadeja Pragati",
    "Contact page Jadeja Pragati",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Contact Us | Jadeja Pragati",
    description:
      "Contact Jadeja Pragati to discuss opportunities, ideas, or just say hello. We're excited to hear from you!",
    url: "https://www.jadejapragati.com/contact-us",
    siteName: "Jadeja Pragati",
    type: "website",
  },
  alternates: {
    canonical: "https://www.jadejapragati.com/contact-us",
  },
};

export default function ContactPage() {
  return (
    <section
      className="pt-20 pb-12 overflow-x-hidden"
      style={{
        background: `
          linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 245, 240, 0.3) 100%),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 10%, rgba(255, 245, 240, 0.2) 30%)
        `,
      }}
    >
      <Getintouch />
      <MapContact />
    </section>
  );
}
