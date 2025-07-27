import { notFound } from "next/navigation";
import Image from "next/image";
import BlogHeaderInformation from "@/app/client/components/blogPage/blogHeaderInformation";
import { fetchBlogById } from "../lib/api";
import parse from "html-react-parser";
import "@/app/styles/blogs.css"
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>; 
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await fetchBlogById((await params).id);

  if (!blog) return {};

  return {
    title: `${blog.title} | Jadeja Pragati`,
    description: blog.shortDescription,
    keywords: [
      blog.title,
      "Jadeja Pragati Blog",
      "Business Blog",
      "Environmental Updates",
      "Sustainability Articles",
      "EPR",
      "Waste",
      "Consulting"
    ],
    openGraph: {
      title: `${blog.title} | Jadeja Pragati`,
      description: blog.shortDescription,
      url: `https://www.jadejapragati.com/blogs/${(await params).id}`,
      siteName: "Jadeja Pragati",
      type: "article",
      images: [
        {
          url: blog.imageUrl,
          alt: blog.title,
        },
      ],
    },
  };
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
        <div className="relative h-[250px] w-full sm:h-[250px]  md:h-[400px] lg:h-[500px] mb-8 rounded-xl overflow-hidden shadow-md">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="blog-content">{parse(blog.content)}</div>
      </div>
    </>
  );
}
