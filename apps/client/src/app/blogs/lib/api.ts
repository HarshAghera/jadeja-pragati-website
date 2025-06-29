import { Blog, RawBlog } from '@/app/blogs/types/blog';
const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function fetchBlogById(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${apiUrl}/blogs/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    const blog = data.value.data.find(
      (item: { _id: string }) => item._id === id,
    );
    if (!blog) return null;

    return {
      id: blog._id,
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl,
      isPublished: blog.isPublished,
      shortDescription: blog.shortDescription,
      createdAt: blog.createdAt,
    };
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    return null;
  }
}
export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${apiUrl}/blogs/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    console.error('Failed to fetch blogs:', error);
    return [];
  }
}
