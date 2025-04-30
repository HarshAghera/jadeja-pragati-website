import React, { JSX } from "react";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "react-feather";
import Link from "next/link";
import "@/app/styles/footer.css";

interface SocialMediaLink {
  icon: JSX.Element;
  link: string;
}

interface FooterLink {
  name: string;
  link: string;
}

const Footer = () => {
  const services: FooterLink[] = [
    { name: "Regulatory Consulting", link: "/services/regulatory-consulting" },
    { name: "Compliance Training", link: "/services/compliance-training" },
    { name: "Risk Management", link: "/services/risk-management" },
    { name: "Audit Support", link: "/services/audit-support" },
    { name: "Global Compliance", link: "/services/global-compliance" },
  ];

  const informative: FooterLink[] = [
    { name: "Contact Us", link: "/contact" },
    { name: "About Us", link: "/aboutUs" },
    { name: "Projects", link: "/projects" },
    { name: "Investments", link: "/investments" },
  ];

  const footerBottomLinks: FooterLink[] = [
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms of Service", link: "/terms" },
    { name: "Cookie Policy", link: "/cookie-policy" },
    { name: "Sitemap", link: "/sitemap" },
  ];

  const socialMedia: SocialMediaLink[] = [
    { icon: <Facebook size={24} />, link: "https://facebook.com" },
    { icon: <Instagram size={24} />, link: "https://instagram.com" },
    { icon: <Twitter size={24} />, link: "https://twitter.com" },
  ];

  return (
    <footer className="bg-[#0f2557] text-white px-8 pt-6 pb-12">
      {/* Top Part */}
      <div className="flex justify-between items-center pt-12 mb-24 flex-wrap gap-6">
        <div>
          <h2 className="text-3xl font-bold">
            Ready to strengthen your compliance posture?
          </h2>
          <p className="mt-2 text-white/50">
            Schedule a consultation with our compliance experts today.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="started-button px-6 py-2 text-base rounded-full font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="lg:mr-8">
          <Image
            src="/fullLogo.webp"
            alt="Company Logo"
            width={130}
            height={40}
            className="mb-4"
          />
          <p className="text-white/50 mb-8">
            Empowering organizations to navigate regulatory complexities with
            confidence since 2020.
          </p>
          <div className="flex gap-8">
            {socialMedia.map((social, index) => (
              <Link href={social.link} key={index} passHref>
                <span className="text-white/50 hover:text-white hover:scale-110 transition-transform cursor-pointer">
                  {social.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start lg:ml-12">
          <h3 className="text-lg font-bold mb-6">Major Services</h3>
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name}>
                <Link href={service.link} passHref>
                  <span className="text-white/50 hover:text-white cursor-pointer">
                    {service.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-6">Informative</h3>
          <ul className="space-y-3">
            {informative.map((info) => (
              <li key={info.name}>
                <Link href={info.link} passHref>
                  <span className="text-white/50 hover:text-white cursor-pointer">
                    {info.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-6">Contact Us</h3>
          <ul className="space-y-3 text-white/50">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> 123 Business Street, Ahmedabad, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> Phone: +91 9999999999
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> Email: info@company.com
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap justify-center md:justify-between items-center pt-8 border-t border-white/20 gap-6 text-center">
        <p className="text-sm text-white/50">
          © 2025 Jadeja Pragati Pvt. Ltd. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {footerBottomLinks.map((item) => (
            <Link href={item.link} key={item.name} passHref>
              <span className="text-white/50 hover:text-white text-sm cursor-pointer">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
