import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "react-feather";
import { ArrowRight } from "lucide-react";
import "@/app/styles/footer.css";

interface SocialMediaLink {
  icon: JSX.Element;
  link: string;
}

interface FooterLink {
  name: string;
  link: string;
}

const Footer: React.FC = () => {
  const services: FooterLink[] = [
    { name: "Regulatory Consulting", link: "/services/regulatory-consulting" },
    { name: "Compliance Training", link: "/services/compliance-training" },
    { name: "Risk Management", link: "/services/risk-management" },
    { name: "Audit Support", link: "/services/audit-support" },
    { name: "Global Compliance", link: "/services/global-compliance" },
  ];

  const informative: FooterLink[] = [
    { name: "Contact Us", link: "/contact-us" },
    { name: "About Us", link: "/about-us" },
    { name: "Blogs", link: "/blogs" },
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
    <footer className="bg-[#0f2557] text-white px-4 sm:px-6 md:px-8 pt-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-12 mb-16 gap-6 md:text-left">
        <div className="pl-4 sm:pl-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to strengthen your compliance posture?
          </h2>
          <p className="mt-2 text-white/50">
            Schedule a consultation with our compliance experts today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        <div className="lg:mr-8 pl-4 sm:pl-6">
          <Image
            src="/pictures/fullLogo.webp"
            alt="Company Logo"
            width={130}
            height={40}
            className="mb-4"
          />
          <p className="text-white/50 mb-8">
            Empowering organizations to navigate regulatory complexities with
            confidence since 2020.
          </p>
          <div className="flex flex-wrap gap-6">
            {socialMedia.map((social, index) => (
              <Link href={social.link} key={index} passHref>
                <span className="text-white/50 hover:text-white hover:scale-110 transition-transform cursor-pointer">
                  {social.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Major Services */}
        <div className="flex flex-col items-start lg:ml-12 pl-4 sm:pl-6">
          <h3 className="text-lg font-bold mb-6">Major Services</h3>
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name} className="relative pl-0">
                <Link href={service.link} passHref>
                  <span className="group block text-white/50 hover:text-white cursor-pointer transition-all relative">
                    <ArrowRight
                      size={16}
                      className="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200"
                    />
                    {service.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Informative Links */}
        <div className="flex flex-col items-start pl-4 sm:pl-6">
          <h3 className="text-lg font-bold mb-6">Informative</h3>
          <ul className="space-y-3">
            {informative.map((info) => (
              <li key={info.name} className="relative pl-0">
                <Link href={info.link} passHref>
                  <span className="group block text-white/50 hover:text-white cursor-pointer transition-all relative">
                    <ArrowRight
                      size={16}
                      className="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200"
                    />
                    {info.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start pl-4 sm:pl-6">
          <h3 className="text-lg font-bold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-white/50 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-1" />
              <div className="leading-relaxed">
                415, K-Star Business Hub,
                <br />
                Nr. White Pelican, Opp. D-Mart,
                <br />
                S.P. Ring Road,
                <br />
                Dehgam Cross Road, Ahmedabad
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a
                href="tel:+917202096968"
                className="hover:text-white transition-colors"
              >
                +91 7202096968
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a
                href="mailto:jadejapragati.pltd@gmail.com"
                className="hover:text-white transition-colors"
              >
                jadejapragati.pltd@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center pt-8 border-t border-white/20 gap-4 text-center">
        <p className="text-sm text-white/50">
          © 2025 Jadeja Pragati (I) Pvt. Ltd. All rights reserved.
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
