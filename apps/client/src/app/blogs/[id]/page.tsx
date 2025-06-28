import { notFound } from "next/navigation";
import Image from "next/image";
import BlogHeaderInformation from "@/app/client/components/blogPage/blogHeaderInformation";
import { fetchBlogById } from "../lib/api";
import parse from "html-react-parser";
import "@/app/styles/blogs.css"

interface Props {
  params: Promise<{ id: string }>; 
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params; 
  const blog = await fetchBlogById(id);

  if (!blog) return notFound();

  return (
    <>
      <BlogHeaderInformation
        title={blog.title}
        description={blog.shortDescription}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-500 mb-6">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <div className="relative w-full h-auto mb-8 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={800}
            height={300}
            sizes="100vw"
            className="w-full h-auto rounded shadow-md"
          />
        </div>
        <div className="blog-content">{parse(blog.content)}</div>
      </div>
    </>
  );
}
