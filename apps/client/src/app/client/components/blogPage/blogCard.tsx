"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Blog } from "@/app/blogs/types/blog";
import { Button } from "@/components/ui/button";

export default function BlogCard({ blogs }: { blogs: Blog[] }) {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const visibleBlogs = blogs.slice(0, visibleCount);
  const hasMore = visibleCount < blogs.length;

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 md:px-10 py-12 w-full">
        {visibleBlogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`} className="group">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 min-h-[400px] max-h-[400px] flex flex-col">
              <div className="relative w-full aspect-[14/9] overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col">
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h2 className="text-2xl font-bold text-[#0f2557] leading-tight line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-md text-gray-600 line-clamp-3 mt-auto">
                  {blog.shortDescription}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <Button
          onClick={handleLoadMore}
          className="px-8 py-2 mb-10 rounded-lg bg-[#0f2557] text-white hover:bg-[#1e3a8a] transition-all cursor-pointer"
        >
          Load More
        </Button>
      )}
    </div>
  );
}
