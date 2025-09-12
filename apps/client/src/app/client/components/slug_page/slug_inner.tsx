"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ContactFormSmall from "@/app/client/components/small-contact-form";
import "@/app/styles/esg.css";
import { PageData } from "./types/slug_page_data";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function SlugInnerPage({ data }: { data: PageData }) {
  const [active, setActive] = useState("");
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  const [htmlContent, setHtmlContent] = useState("");
  const [descriptionContent, setDescriptionContent] = useState("");
  const [mounted, setMounted] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarLeft, setSidebarLeft] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!data) return;

    const html = data?.value?.htmlContent || "";
    const descriptionHtml = data?.value?.description || "";
    const titleFromApi = data?.value?.title || "";

    const parser = new DOMParser();

    const mainDoc = parser.parseFromString(html, "text/html");
    const descDoc = parser.parseFromString(descriptionHtml, "text/html");

    const h1TagsForSidebar: { id: string; title: string }[] = [];

    const processH1Tags = (doc: Document) => {
      Array.from(doc.querySelectorAll("h1")).forEach((h1) => {
        const originalText = h1.textContent?.trim() || "";

        if (doc === mainDoc) {
          const id = slugify(originalText);
          h1TagsForSidebar.push({ id, title: originalText });
          h1.setAttribute("id", id);
        }

        if (
          titleFromApi &&
          !originalText.toLowerCase().includes(titleFromApi.toLowerCase())
        ) {
          h1.textContent = `${originalText} of ${titleFromApi}`;
        }
      });
    };

    processH1Tags(mainDoc);
    processH1Tags(descDoc);

    setSections(h1TagsForSidebar);
    setHtmlContent(mainDoc.body.innerHTML);
    setDescriptionContent(descDoc.body.innerHTML);
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        const offsetFromTop = rect.top + window.scrollY;
        setSidebarFixed(window.scrollY >= offsetFromTop - 100);
      }

      const viewportMiddle = window.innerHeight / 2;

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
            setActive(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const [stopSidebar, setStopSidebar] = useState(false);
  const milestoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!milestoneRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStopSidebar(true); // milestones in view → stop sidebar
          } else {
            setStopSidebar(false); // milestones out of view → sidebar scrolls
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(milestoneRef.current);

    return () => {
      if (milestoneRef.current) observer.unobserve(milestoneRef.current);
    };
  }, []);
  useEffect(() => {
    const handleSidebarStop = () => {
      if (!milestoneRef.current || !mainRef.current) return;

      const milestoneTop =
        milestoneRef.current.getBoundingClientRect().top + window.scrollY;
      const sidebarHeight =
        mainRef.current.querySelector("nav")?.clientHeight || 0;
      const scrollY = window.scrollY;

      // If the bottom of the sidebar would overlap milestone → stop it
      if (scrollY + sidebarHeight + 120 >= milestoneTop) {
        setStopSidebar(true);
      } else {
        setStopSidebar(false);
      }
    };

    window.addEventListener("scroll", handleSidebarStop, { passive: true });
    handleSidebarStop();

    return () => window.removeEventListener("scroll", handleSidebarStop);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect();
        setSidebarLeft(rect.left);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <section
        className="pt-20"
        style={{
          background: `
            linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 245, 240, 0.2) 100%),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 10%, rgba(255, 245, 240, 0.2) 30%)
          `,
        }}
      >
        <div className="relative w-full h-auto py-12 lg:py-20 overflow-hidden">
          <Image
            src="/pictures/windmill.webp"
            alt="Background"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 bg-white/75 z-10" />

          <div className="relative z-20 px-5 sm:px-6">
            <div className="w-full flex flex-col gap-10 items-start">
              <div className="w-full max-w-4xl ml-0 lg:ml-8">
                <div
                  className="api-description"
                  dangerouslySetInnerHTML={{ __html: descriptionContent }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div ref={mainRef} className="flex gap-8 px-4 lg:px-12 mt-10 mb-10">
        <nav
          ref={sidebarRef}
          className="hidden xl:block w-64 overflow-auto max-h-[calc(100vh-6rem)]"
          style={{
            position: sidebarFixed
              ? stopSidebar
                ? "absolute"
                : "fixed"
              : "relative",
            top: sidebarFixed ? (stopSidebar ? "auto" : "6rem") : "auto",
            left:
              sidebarFixed && !stopSidebar && sidebarLeft !== null
                ? `${sidebarLeft}px`
                : "auto",
            bottom: stopSidebar ? "0" : "auto",
            paddingTop: sidebarFixed ? "20px" : "0px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <ul className="space-y-3">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`block px-4 py-2 rounded-md transition-all duration-300 ${
                    active === id
                      ? "bg-[#0f2557] text-white"
                      : "bg-gray-100 text-black hover:bg-[#D4BEE4]"
                  }`}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main
          className={`flex-1 space-y-16 ${
            sidebarFixed ? "xl:ml-[289px]" : "ml-0"
          }`}
        >
          {htmlContent && (
            <div
              className="content-area"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          )}

          <div className="block xl:hidden mt-10">
            <div className="bg-[#0f2557] text-white rounded-xl p-6 shadow-xl max-w-md ml-0">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                Free Call Back by our Expert
              </h3>
              <ContactFormSmall />
              <p className="text-sm mt-2 text-gray-300 text-center">
                Easy Payment Options Available. No Spam. 100% Confidential.
              </p>
            </div>
          </div>
        </main>

        <aside className="hidden lg:block w-[300px]">
          <div className="sticky top-28 bg-[#0f2557] text-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              Free Call Back by our Expert
            </h3>
            <ContactFormSmall />
            <p className="text-sm mt-2 text-gray-300">
              Easy Payment Options Available. No Spam. 100% Confidential.
            </p>
          </div>
        </aside>
      </div>

      <div ref={milestoneRef} className="milestones-main">
        <div className="container-main">
          <div className="milestone-heading">
            <h2>Path to Your Certificate</h2>
          </div>
          <div className="timeline">

            <div className="milestone bottom">
              <div className="dot"></div>
              <div className="card">
                <span className="number">1</span>
                <h3>Milestone</h3>
                <p>This is a sample text. Insert your desired text here.</p>
              </div>
            </div>

            <div className="milestone top">
              <div className="dot"></div>
              <div className="card">
                <span className="number">2</span>
                <h3>Milestone</h3>
                <p>This is a sample text. Insert your desired text here.</p>
              </div>
            </div>

            <div className="milestone bottom">
              <div className="dot"></div>
              <div className="card">
                <span className="number">3</span>
                <h3>Milestone</h3>
                <p>This is a sample text. Insert your desired text here.</p>
              </div>
            </div>

            <div className="milestone top">
              <div className="dot"></div>
              <div className="card">
                <span className="number">4</span>
                <h3>Milestone</h3>
                <p>This is a sample text. Insert your desired text here.</p>
              </div>
            </div>

            <div className="milestone bottom">
              <div className="dot"></div>
              <div className="card">
                <span className="number">5</span>
                <h3>Milestone</h3>
                <p>This is a sample text. Insert your desired text here.</p>
              </div>
            </div>

            <div className="milestone top">
              <div className="dot"></div>
              <div className="card">
                <span className="number">6</span>
                <h3>Milestone</h3>
                <p>This is a sample text. Insert your desired text here.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
