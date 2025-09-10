"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Plus, X, Menu, ChevronDown, ArrowRight } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "@/app/styles/header.css";
import { fetchDropdownMenus, DropdownMenus } from "./servicesdata";

type Section = keyof DropdownMenus;

const HeaderClient = () => {
  const [dropdownMenus, setDropdownMenus] = useState<DropdownMenus>({
    Consulting: {},
    Business: {},
    Waste: {},
    EPR: {},
  });

  useEffect(() => {
    const loadMenus = async () => {
      const data = await fetchDropdownMenus();

      const cleaned: DropdownMenus = {};
      for (const section in data) {
        cleaned[section] = {};
        for (const category in data[section]) {
          cleaned[section][category] = {};

          const subSubCategories = data[section][category];
          for (const subSubCategory in subSubCategories) {
            const items = subSubCategories[subSubCategory];
            cleaned[section][category][subSubCategory] = Array.isArray(items)
              ? items
              : [items];
          }
        }
      }

      setDropdownMenus(cleaned);
    };
    loadMenus();
  }, []);

  const [openDropdown, setOpenDropdown] = useState<Section | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<Section | null>(
    null
  );
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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
      setScrolled(window.scrollY > window.innerHeight * 0.01);
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

  const sectionNames: Section[] = ["Consulting", "Business", "Waste", "EPR"];

   const projectItems = [
     { name: "Investment", slug: "investment" },
     { name: "Proprietor Firm", slug: "proprietor-firm" },
     { name: "Partnership Firm", slug: "partnership-firm" },
     { name: "Private Limited Company", slug: "private-limited-company" },
     { name: "LLP Company", slug: "llp-company" },
   ];
  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-[94vw] min-w-[320px] mx-auto">
          <div className="flex items-center justify-between py-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/pictures/jp_logo.webp"
                alt="Logo"
                height={145}
                width={145}
                className="object-contain min-w-[36px] sm:min-w-[42px] lg:min-w-[48px]"
              />
            </Link>

            <div className="hidden [@media(min-width:1060px)]:flex items-center flex-grow justify-between text-[#0f2557] ml-12 relative">
              <div className="flex items-center gap-7">
                {sectionNames.map((name) => {
                  const title = name;
                  const menu = dropdownMenus[name];
                  const categories = Object.keys(menu);

                  return (
                    <div
                      key={name}
                      className="relative"
                      ref={openDropdown === name ? dropdownRef : null}
                      onMouseEnter={() => {
                        setOpenDropdown(name);
                        setActiveCategory(categories[0]);
                      }}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div
                        className="group flex items-center cursor-pointer"
                        onClick={() =>
                          setOpenDropdown((prev) =>
                            prev === name ? null : name
                          )
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
                            className="fixed top-[80px] left-[8vw] w-[84vw] max-w-[1280px] h-auto lg:h-[500px] z-50 flex flex-col lg:flex-row bg-[#f8f9fa] rounded-md shadow-lg p-4 sm:p-6"
                          >
                            <div className="w-1/3 pr-4 border-r border-gray-300 overflow-y-auto lg:overflow-y-visible lg:max-h-none max-h-[200px]">
                              <ul className="space-y-2">
                                {categories.map((cat) => (
                                  <li key={cat}>
                                    <button
                                      onMouseEnter={() =>
                                        setActiveCategory(cat)
                                      }
                                      className={`w-full text-left flex justify-between items-center px-4 py-2 rounded ${
                                        activeCategory === cat
                                          ? "bg-[#0f2557] text-white"
                                          : "hover:bg-gray-200 text-gray-800"
                                      }`}
                                    >
                                      <span className="text-sm lg:text-md xl:text-lg">
                                        {cat}
                                      </span>
                                      <ChevronDown
                                        className={`w-4 h-4 ml-2 transition-transform ${
                                          activeCategory === cat
                                            ? "rotate-90"
                                            : ""
                                        }`}
                                      />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="w-2/3 pl-6">
                              <h3 className="text-[#0f2557] text-md lg:text-xl xl:text-2xl text-2xl font-semibold mb-3">
                                {activeCategory}
                              </h3>
                              <ul
                                className="
                                      list-none pr-2
                                      max-h-[420px]
                                      [column-fill:_auto] 
                                      columns-1
                                      sm:columns-2
                                      lg:columns-2
                                    "
                              >
                                {dropdownMenus[openDropdown] &&
                                  dropdownMenus[openDropdown][activeCategory] &&
                                  Object.entries(
                                    dropdownMenus[openDropdown][activeCategory]
                                  ).map(([subSubCategoryName, items]) =>
                                    items.map((item, i) => (
                                      <li
                                        key={i}
                                        className="break-inside-avoid"
                                      >
                                        <Link
                                          href={`/${String(openDropdown)
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}/${String(
                                            activeCategory
                                          )
                                            .toLowerCase()
                                            .replace(
                                              /\s+/g,
                                              "-"
                                            )}/${encodeURIComponent(
                                            item.slug
                                          )}`}
                                          onClick={() => {
                                            setOpenDropdown(null);
                                            setActiveCategory("");
                                          }}
                                          className="group relative flex items-center text-gray-800 hover:text-[#0f2557] py-2 "
                                        >
                                          <ArrowRight
                                            className="absolute left-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                                            size={16}
                                          />
                                          <span className="pl-5 text-sm lg:text-md xl:text-lg">
                                            {subSubCategoryName}
                                          </span>
                                        </Link>
                                      </li>
                                    ))
                                  )}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div
                  className="relative"
                  ref={openDropdown === "Projects" ? dropdownRef : null}
                  onMouseEnter={() => setOpenDropdown("Projects")}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div
                    className="group flex items-center cursor-pointer"
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === "Projects" ? null : "Projects"
                      )
                    }
                  >
                    <span className="relative group-hover:text-[#0f2557]">
                      Projects
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#0f2557] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <Plus
                      size={18}
                      className={`ml-1 transition-transform ${
                        openDropdown === "Projects" ? "rotate-45" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {openDropdown === "Projects" && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-full left-0 mt-2 bg-[#f8f9fa] rounded-md shadow-lg z-50 w-64"
                      >
                        <ul className="p-3 space-y-2">
                          {projectItems.map((item, i) => (
                            <li key={i} className="relative group">
                              <Link
                                href={`/projects/${item.slug}`}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-center text-gray-800 hover:text-[#0f2557] py-2 pl-5"
                              >
                                <ArrowRight
                                  className="absolute left-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                                  size={16}
                                />
                                <span className="text-sm lg:text-sm xl:text-lg">
                                  {item.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link
                  href="/blogs"
                  className="hover:text-[#093f54] hover-underline"
                >
                  Blogs
                </Link>
                <Link
                  href="/about-us"
                  className="hover:text-[#093f54] hover-underline"
                >
                  About Us
                </Link>
              </div>

              <div>
                <Link
                  href="/contact-us"
                  className="third px-6 py-2 text-base rounded-full font-semibold"
                >
                  Get in touch
                </Link>
              </div>
            </div>

            <div className="[@media(min-width:1060px)]:hidden">
              <button onClick={() => setMobileMenuOpen(true)}>
                <Menu size={30} className="text-[#0f2557]" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 right-0 w-full h-screen bg-white shadow-lg z-[999] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <Link href="/">
                  <Image
                    src="/pictures/jp_logo.webp"
                    alt="Logo"
                    width={120}
                    height={40}
                  />
                </Link>

                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={28} />
                </button>
              </div>

              <ul className="px-4 py-2 space-y-3">
                {sectionNames.map((section) => {
                  const menu = dropdownMenus[section];
                  const categories = Object.keys(menu ?? {});

                  return (
                    <li key={section}>
                      <button
                        className="w-full flex justify-between items-center text-left text-md font-semibold text-[#0f2557] py-2"
                        onClick={() =>
                          setMobileOpenDropdown((prev) =>
                            prev === section ? null : section
                          )
                        }
                      >
                        {section}
                        <ChevronDown
                          className={`transition-transform ${
                            mobileOpenDropdown === section ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileOpenDropdown === section && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 mt-2"
                          >
                            <div
                              data-lenis-prevent
                              className="pl-4 max-h-[200px] overflow-y-auto pr-2 space-y-1"
                            >
                              {categories.map((cat) => (
                                <div key={cat}>
                                  <button
                                    className="w-full flex justify-between items-center text-left py-2 text-[#0f2557] font-medium hover:text-[#093f54]"
                                    onClick={() =>
                                      setMobileActiveCategory((prev) =>
                                        prev === cat ? "" : cat
                                      )
                                    }
                                  >
                                    <span>{cat}</span>
                                    <ChevronDown
                                      className={`transition-transform ${
                                        mobileActiveCategory === cat
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                      size={18}
                                    />
                                  </button>
                                  {mobileActiveCategory === cat && (
                                    <div className="pl-4 max-h-[300px] overflow-y-auto pr-2 space-y-1">
                                      {menu[cat] &&
                                        Object.entries(menu[cat]).map(
                                          ([subSubCategoryName, items]) =>
                                            items.map((item, idx) => (
                                              <Link
                                                href={`/${String(
                                                  mobileOpenDropdown
                                                )
                                                  .toLowerCase()
                                                  .replace(
                                                    /\s+/g,
                                                    "-"
                                                  )}/${String(
                                                  mobileActiveCategory
                                                )
                                                  .toLowerCase()
                                                  .replace(/\s+/g, "-")}/${
                                                  item.slug
                                                }`}
                                                key={idx}
                                                className="block text-sm text-gray-700 hover:text-[#0f2557] py-1"
                                                onClick={() => {
                                                  setMobileMenuOpen(false);
                                                  setMobileOpenDropdown(null);
                                                  setMobileActiveCategory("");
                                                }}
                                              >
                                                {subSubCategoryName}
                                              </Link>
                                            ))
                                        )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}

                <li>
                  <button
                    className="w-full flex justify-between items-center text-left text-md font-semibold text-[#0f2557] py-2"
                    onClick={() =>
                      setMobileOpenDropdown((prev) =>
                        prev === "Projects" ? null : "Projects"
                      )
                    }
                  >
                    Projects
                    <ChevronDown
                      className={`transition-transform ${
                        mobileOpenDropdown === "Projects" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileOpenDropdown === "Projects" && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-6 space-y-2"
                      >
                        {projectItems.map((item, i) => (
                          <li key={i}>
                            <Link
                              href={`/projects/${item.slug}`}
                              className="block py-2 text-sm text-gray-700 hover:text-[#0f2557]"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="block py-2 text-[#0f2557] font-semibold"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileOpenDropdown(null);
                      setMobileActiveCategory("");
                    }}
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="block py-2 text-[#0f2557] font-semibold"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileOpenDropdown(null);
                      setMobileActiveCategory("");
                    }}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="block py-2 text-[#0f2557] font-semibold"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileOpenDropdown(null);
                      setMobileActiveCategory("");
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default HeaderClient;
