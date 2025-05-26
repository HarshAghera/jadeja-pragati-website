import { notFound } from "next/navigation";
import Image from "next/image";
import BlogHeaderInformation from "@/app/client/components/blogPage/blogHeaderInformation";

interface Blog {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
}

const blogs: Blog[] = [
  {
    slug: "environment-study",
    title: "The Importance of Environmental Studies",
    description:
      "Understanding our environment helps protect the earth and ensure a sustainable future.",
    content:
      "Full detailed content about environmental studies... Lorem ipsum dolor sit amet...",
    image: "/blogs/enviromental.jpg",
    date: "2025-05-20T10:00:00Z",
  },
  {
    slug: "tech-innovation",
    title: "Tech Innovations in 2025",
    description:
      "Exploring the latest trends and technologies reshaping our digital world.",
    content:
      "Full detailed content about tech innovations in 2025... Lorem ipsum dolor sit amet...",
    image: "/blogs/tech.jpg",
    date: "2025-04-10",
  },
  // {
  //   slug: "license-innovation",
  //   title: "License innvoation in 2025",
  //   description:
  //     "Exploring the latest trends and technologies reshaping our digital world.",
  //   content:
  //     "Full detailed content about tech innovations in 2025... Lorem ipsum dolor sit amet...",
  //   image: "/blogs/tech.jpg",
  //   date: "2025-04-10",
  // },
];

interface Props {
  params: { slug: string };
}

export default async function BlogPost(props: Props) {
  const { slug } = await props.params;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) notFound();

  return (
    <>
      <BlogHeaderInformation
        title={blog.title}
        description={blog.description}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-500 mb-6">
          {new Date(blog.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <div className="relative w-full h-auto mb-8 rounded overflow-hidden shadow-md">
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={300}
            sizes="100vw"
            className="w-full h-auto rounded shadow-md"
          />
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">{blog.content}</p>
      </div>
    </>
  );
}
