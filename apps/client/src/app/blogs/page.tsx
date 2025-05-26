import Image from "next/image";
import BlogContent from "../client/components/blogPage/blogContent";
import BlogCard from "../client/components/blogPage/blogCard";

export default function Blogs() {
  return (
    <section
      className="pt-20 overflow-x-hidden"
      style={{
        background: `
        linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 245, 240, 0.3) 100%),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 10%, rgba(255, 245, 240, 0.2) 30%)
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
        <BlogContent/>
      </div>
      <BlogCard/>
    </section>
  );
}
