"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

type DropdownName = "regulatory" | "environmental" | "License";

const dropdownLinks = {
  regulatory: [
    { label: "Compliance Advisory", href: "/regulatory/compliance-advisory" },
    { label: "Govt Liaisoning", href: "/regulatory/govt-liaisoning" },
    { label: "Audit & Inspection", href: "/regulatory/audit-inspection" },
  ],
  environmental: [
    { label: "Waste Management", href: "/environmental/waste-management" },
    { label: "Water Treatment", href: "/environmental/water-treatment" },
    { label: "Air Quality Monitoring", href: "/environmental/air-quality" },
  ],
  License: [
    { label: "Factory License", href: "/License/factory" },
    { label: "Pollution Control", href: "/License/pollution-control" },
    { label: "Fire Safety NOC", href: "/License/fire-safety-noc" },
  ],
};

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownName | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: DropdownName) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleMouseEnter = (name: DropdownName) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  const navLinkClass = `relative transition-all text-lg cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
    isScrolled ? "text-blue-900 after:bg-blue-900" : "text-white after:bg-white"
  }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-[90%] mx-auto flex items-center justify-between h-20 transition-colors duration-500 ease-in-out">
        <Link href="/" className="h-full flex items-center">
        <Image
  src="/jadejaPragati.png"
  width={0}
  height={0}
  sizes="100vw"
  alt="logo"
  className="h-auto object-contain w-[140px] sm:w-[150px] md:w-[180px] lg:w-[200px] xl:w-[220px]"
/>

        </Link>

        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X
                size={30}
                className={isScrolled ? "text-blue-900" : "text-white"}
              />
            ) : (
              <Menu
                size={30}
                className={isScrolled ? "text-blue-900" : "text-white"}
              />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-7 items-center relative">
          {["regulatory", "environmental", "License"].map((name) => {
            const title = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <div
                key={name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(name as DropdownName)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleDropdown(name as DropdownName)}
                  className={`${navLinkClass} flex items-center gap-1`}
                >
                  {title}
                  <Plus
                    size={18}
                    className={`transition-transform duration-300 ${
                      openDropdown === name ? "rotate-45" : ""
                    } ${isScrolled ? "text-blue-900" : "text-white"}`}
                  />
                </button>
                {openDropdown === name && (
                  <div className="absolute top-full mt-5 bg-white/90 rounded-lg w-50 py-2 z-50 shadow-lg">
                    {dropdownLinks[name as DropdownName].map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="group block px-5 py-2 text-black font-medium relative transition-all duration-300 hover:translate-x-1"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.label}
                        <span className="absolute left-5 bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-[calc(70%)]"></span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <Link href="/blog" className={navLinkClass}>
            Blog
          </Link>
          <Link href="/about" className={navLinkClass}>
            About Us
          </Link>
          <Link href="/contact" className={navLinkClass}>
            Contact Us
          </Link>
          <Link href="/projects" className={navLinkClass}>
            Projects
          </Link>

          <button
            onClick={() => setSidebarOpen(true)}
            className={`${
              isScrolled ? "text-blue-900" : "text-white"
            } font-bold py-2 px-4 rounded hover:bg-blue-400 transition-all duration-300`}
          >
            <Menu size={30} />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/90 text-white w-full px-6 py-4 space-y-4">
          {["regulatory", "environmental", "License"].map((name) => (
            <div key={name}>
              <button
                className="flex items-center justify-between w-full font-semibold text-left text-white py-2"
                onClick={() => toggleDropdown(name as DropdownName)}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
                <Plus
                  size={18}
                  className={`transition-transform ${
                    openDropdown === name ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openDropdown === name && (
                <div className="ml-4 mt-2 space-y-1">
                  {dropdownLinks[name as DropdownName].map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="block text-sm font-medium text-white hover:text-sky-300"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/blog"
            className="block font-semibold py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="block font-semibold py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block font-semibold py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            href="/projects"
            className="block font-semibold py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
        </div>
      )}

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-500 ease-in-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 w-[28rem] bg-white text-black h-full transform transition-transform duration-500 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <button
          className="absolute top-4 right-4 text-black cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={30} />
        </button>
        <div className="flex flex-col items-start p-10 space-y-10">
          <div className="w-full">
            <Image
              src="/jadejaPragati.png"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-64 h-auto object-contain"
            />
          </div>

          <div className="space-y-3">
            <p className="text-2xl font-bold">Our Vision</p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod urna et quam laoreet, id venenatis turpis bibendum.
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-semibold text-2xl">Contact Us</p>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="mt-1" />
              <p className="text-lg leading-relaxed">
                415, K-Star Business Hub, <br /> Nr. White Pelicon, Opp. D-mart,{" "}
                <br /> S.P Ring Road,Dehgam Cross Road, Ahmedabad-382345
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={20} className="mt-1" />
              <p className="text-lg">jadejaPragati12@gmail.com</p>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={20} className="mt-1" />
              <p className="text-lg">+123 456 7890</p>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={20} className="mt-1" />
              <p className="text-lg">+098 765 4321</p>
            </div>
          </div>

          <div className="flex space-x-6">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="text-black hover:text-sky-600 transition-transform duration-300 hover:scale-110 hover:-translate-y-1" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="text-black hover:text-pink-600 transition-transform duration-300 hover:scale-110 hover:-translate-y-1" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="text-black hover:text-sky-400 transition-transform duration-300 hover:scale-110 hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
