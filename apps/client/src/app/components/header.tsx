"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Plus, X, Menu } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "@/app/styles/header.css";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(
    null
  );
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Dropdown toggle functions
  const handleOpenDropdown = (name: string) => setOpenDropdown(name);
  const handleCloseDropdown = () => setOpenDropdown(null);
  const handleToggleDropdown = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  // Outside click handler
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
    ) {
      setMobileMenuOpen(false);
      setMobileOpenDropdown(null);
    }
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > window.innerHeight * 0.2);
  };

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`fixed w-full backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 shadow-md" : "bg-transparent"
      }`}
    >
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: "calc(100vw - 10%)",
          minWidth: "320px",
          transition: "max-width 0.2s ease",
        }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0 mr-5">
            <Image
              src="/jp_logo.webp"
              alt="Logo"
              height={145}
              width={145}
              className="object-contain min-w-[36px] sm:min-w-[42px] lg:min-w-[48px]"
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-between flex-grow text-md xl:text-base ml-4 lg:ml-8 xl:ml-12">
            <div className="nav-links flex items-center gap-x-4 xl:gap-x-6">
              {["environmental", "license"].map((name) => {
                const title = name.charAt(0).toUpperCase() + name.slice(1);
                return (
                  <div
                    key={name}
                    className="relative"
                    ref={openDropdown === name ? dropdownRef : null}
                    onMouseEnter={() => handleOpenDropdown(name)}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <div
                      className="group flex items-center cursor-pointer"
                      onClick={() => handleToggleDropdown(name)}
                    >
                      <span className="relative text-[#0f2557] transition-colors duration-300 group-hover:text-[#093f54]">
                        {title}
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#093f54] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <button className="flex items-center gap-1 px-2 py-1 text-[#0f2557] group-hover:text-[#093f54] transition-colors duration-300">
                        <Plus
                          size={18}
                          className={`transition-transform duration-300 ${
                            openDropdown === name ? "rotate-45" : ""
                          }`}
                        />
                      </button>
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
                              className="group block px-5 py-3 text-[#0f2557] text-sm font-medium transition-all duration-300 hover:bg-gray-100"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {item.label}
                              <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-[#093f54] transition-all duration-300 group-hover:w-[80%]"></span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center space-x-4">
              {[
                { label: "About Us", href: "about-us" },
                { label: "Projects", href: "projects" },
                { label: "Investments", href: "investments" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="relative px-2 py-1 text-[#0f2557] transition-colors duration-300 group hover:text-[#093f54]"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#093f54] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <div className="ml-auto flex-shrink-0">
              <Link
                href="/contact-us"
                className="third px-6 py-2 text-base rounded-full font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </nav>

          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {mobileMenuOpen ? (
                <X
                  size={30}
                  className={scrolled ? "text-blue-900" : "text-[#0f2557]"}
                />
              ) : (
                <Menu
                  size={30}
                  className={scrolled ? "text-blue-900" : "text-[#0f2557]"}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="lg:hidden bg-white/80 backdrop-blur-md text-[#0f2557] w-full px-6 py-6 space-y-6 flex flex-col items-center text-center"
          >
            {["environmental", "license"].map((name) => {
              const isOpen = mobileOpenDropdown === name;
              return (
                <div
                  key={name}
                  className="w-full flex flex-col items-center space-y-2"
                >
                  <button
                    className="flex items-center justify-center w-full max-w-xs font-semibold text-left py-2"
                    onClick={() =>
                      setMobileOpenDropdown((prev) =>
                        prev === name ? null : name
                      )
                    }
                  >
                    <span className="capitalize mr-2">{name}</span>
                    <Plus
                      size={18}
                      className={`transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center space-y-2 overflow-hidden w-full"
                      >
                        {dropdownLinks[name].map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            className="block w-full text-sm px-5 py-3 text-[#0f2557]"
                            onClick={() => setMobileMenuOpen(false)}
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

            <div className="flex flex-col items-center space-y-4">
              {[
                { label: "About Us", href: "#aboutus" },
                { label: "Projects", href: "#projects" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-base font-medium py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

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

export default Header;
