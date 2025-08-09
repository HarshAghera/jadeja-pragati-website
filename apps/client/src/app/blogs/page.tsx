export const dynamic = "force-dynamic";

import Image from "next/image";
import BlogContent from "../client/components/blogPage/blogContent";
import BlogCard from "../client/components/blogPage/blogCard";
import { fetchBlogs } from "@/app/blogs/lib/api";
import { Blog } from "@/app/blogs/types/blog";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Blogs | Jadeja Pragati",
  description:
    "Explore the latest updates, insights, and articles from Jadeja Pragati covering business, environment, and innovation.",
  keywords: [
    "Jadeja Pragati Blogs",
    "Business Insights",
    "Environmental News",
    "Sustainability Blogs",
    "Innovation Articles",
    "Company Updates",
    "Indian Business Blog",
    "Corporate News",
    "EPR Blogs",
    "Green Initiatives",
    "Waste Management Blog",
  ],
  openGraph: {
    title: "Blogs | Jadeja Pragati",
    description:
      "Explore the latest updates, insights, and articles from Jadeja Pragati covering business, environment, and innovation.",
    url: "https://www.jadejapragati.com/blogs",
    siteName: "Jadeja Pragati",
    type: "website",
  },
};


export default async function BlogsPage() {
  const blogs: Blog[] = await fetchBlogs();
  const publishedBlogs = blogs.filter((blog) => blog.isPublished);

  return (
    <section
      className="pt-20 overflow-x-hidden"
      style={{
        background: `
        linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 245, 240, 0.8) 100%),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 10%, rgba(255, 245, 240, 0.8) 80%)
      `,
      }}
    >
      <div className="relative w-full min-h-[200px] sm:min-h-[300px] md:min-h-[350px]">
        <Image
          src="/pictures/officeimage.webp"
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-white/90 z-10"></div>
        <BlogContent />
      </div>

      <BlogCard blogs={publishedBlogs} />
    </section>
  );
}
