"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Plus, X, Menu } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "@/app/styles/header.css";

const HeaderClient = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(
    null
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownLinks: Record<string, { label: string; href: string }[]> = {
    environmental: [
      { label: "Environmental Item 1", href: "environmental-item1" },
      { label: "Environmental Item 2", href: "environmental-item2" },
    ],
    license: [
      { label: "License Item 1", href: "license-item1" },
      { label: "License Item 2", href: "license-item2" },
    ],
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > window.innerHeight * 0.2);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.2);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();
    handleResize();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[90vw] min-w-[320px] mx-auto">
        <div className="flex items-center justify-between py-1 ">
          <Link href="/" className="flex items-center">
            <Image
              src="/jp_logo.webp"
              alt="Logo"
              height={145}
              width={145}
              className="object-contain min-w-[36px] sm:min-w-[42px] lg:min-w-[48px]"
            />
          </Link>

          <div className="hidden lg:flex items-center flex-grow justify-between text-[#0f2557] ml-12">
            <div className="flex items-center gap-7">
              {["environmental", "license"].map((name) => {
                const title = name.charAt(0).toUpperCase() + name.slice(1);
                return (
                  <div
                    key={name}
                    className="relative"
                    ref={openDropdown === name ? dropdownRef : null}
                    onMouseEnter={() => setOpenDropdown(name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div
                      className="group flex items-center cursor-pointer"
                      onClick={() =>
                        setOpenDropdown((prev) => (prev === name ? null : name))
                      }
                    >
                      <span className="relative group-hover:text-[#0f2557]">
                        {title}
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#0f2557] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <Plus
                        size={18}
                        className={`ml-1 transition-transform ${
                          openDropdown === name ? "rotate-45" : ""
                        }`}
                      />
                    </div>
                    <AnimatePresence>
                      {openDropdown === name && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="absolute top-full left-0 mt-4 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                        >
                          {dropdownLinks[name].map((item, i) => (
                            <Link
                              key={i}
                              href={item.href}
                              className="block px-5 py-3 text-sm hover:bg-gray-100"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link href="about-us" className="hover:text-[#093f54]">
                About Us
              </Link>
              <Link href="projects" className="hover:text-[#093f54]">
                Projects
              </Link>
              <Link href="investments" className="hover:text-[#093f54]">
                Investments
              </Link>
            </div>

            <div>
              <Link
                href="/contact-us"
                className="third px-6 py-2 text-base rounded-full font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu size={30} className="text-[#0f2557]" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4 }}
            className="lg:hidden fixed inset-0 bg-white text-[#0f2557] z-50 flex flex-col items-center justify-center text-center space-y-6 p-6"
          >
            <button
              className="absolute top-6 right-6"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} className="text-[#0f2557]" />
            </button>

            {["environmental", "license"].map((name) => {
              const isOpen = mobileOpenDropdown === name;
              return (
                <div key={name} className="w-full max-w-xs mx-auto">
                  <button
                    className="flex items-center justify-center w-full text-lg  mb-2"
                    onClick={() =>
                      setMobileOpenDropdown((prev) =>
                        prev === name ? null : name
                      )
                    }
                  >
                    <span className="capitalize">{name}</span>
                    <Plus
                      size={18}
                      className={`ml-2 transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        {dropdownLinks[name].map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-sm"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <Link
              href="about-us"
              className="text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="projects"
              className="text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="investments"
              className="text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Investments
            </Link>
            <Link
              href="/contact-us"
              className="third px-6 py-2 text-base rounded-full font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default HeaderClient;
