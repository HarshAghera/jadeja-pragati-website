"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export default function BlogCard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs([
      {
        slug: "environnment-audit",
        title: "Environment Audit in 2025",
        description:
          "Exploring the latest trends and technologies reshaping our digital world.",
        image: "/blogs/Environment-audit.jpg",
        date: "2025-04-10",
      },
      {
        slug: "tech-Earth",
        title: "Tech Earth in 2025",
        description:
          "Exploring the latest trends and technologies reshaping our digital world.",
        image: "/blogs/TechnoEarth.jpg",
        date: "2025-04-10",
      },
      {
        slug: "environment-study",
        title: "The Importance of Environmental Studies",
        description:
          "Understanding our environment helps protect the earth and ensure a sustainable future the earth and ensure a sustainable future.",
        image: "/blogs/enviromental.jpg",
        date: "2025-05-20T10:00:00Z",
      },
      {
        slug: "tech-innovation",
        title: "Tech Innovations in 2025",
        description:
          "Exploring the latest trends and technologies reshaping our digital world the earth and ensure a sustainable future.",
        image: "/blogs/tech.jpg",
        date: "2025-04-10",
      },
    ]);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-10 py-12">
      {blogs.map((blog) => (
        <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 hover:border-transparent">
            <div className="relative w-full aspect-[19/9] overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-4 space-y-2">
              <p className="text-sm text-gray-500">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h2 className="text-base font-bold text-[#0f2557] leading-tight line-clamp-1">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {blog.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
