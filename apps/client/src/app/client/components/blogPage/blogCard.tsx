"use client";

import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/app/blogs/types/blog";

export default function BlogCard({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 md:px-10 py-12">
      {blogs.map((blog) => (
        <Link key={blog.id} href={`/blogs/${blog.id}`} className="group">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 min-h-[350px]">
            <div className="relative w-full aspect-[14/9] overflow-hidden">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 space-y-2">
              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h2 className="text-xl font-bold text-[#0f2557] leading-tight mt-4">
                {blog.title}
              </h2>
              <p className="text-md text-gray-600 line-clamp-3 mt-4">
                {blog.shortDescription}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
