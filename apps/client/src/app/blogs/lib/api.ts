import { Blog, RawBlog } from "@/app/blogs/types/blog";
const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${apiUrl}/blogs/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (data.error) return [];

    return data.value.data.map((blog: RawBlog) => ({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl,
      isPublished: blog.isPublished,
      shortDescription: blog.shortDescription,
      createdAt: blog.createdAt,
    }));
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export async function fetchBlogById(id: string): Promise<Blog | null> {
  const blogs = await fetchBlogs();
  return blogs.find((blog) => blog.id === id) || null;
}
