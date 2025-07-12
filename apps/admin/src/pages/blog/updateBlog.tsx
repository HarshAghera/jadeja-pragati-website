import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import Layout from "./../../components/layout";

interface BlogAPIResponse {
  value: {
    title: string;
    shortDescription: string;
    content: string;
    isPublished: boolean;
    imageUrl: string;
  };
  error: boolean;
}

const UpdateBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<BlogAPIResponse>(
          `http://localhost:4000/blogs/${id}`
        );

        const blog = res.data.value;
        setTitle(blog.title);
        setShortDescription(blog.shortDescription);
        setContent(blog.content);
        setIsPublished(blog.isPublished);
        setImagePreview(blog.imageUrl);
      } catch (err) {
        toast.error("Failed to fetch blog data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !shortDescription || !content) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", shortDescription);
    formData.append("content", content);
    formData.append("isPublished", String(isPublished));
    if (image) formData.append("image", image);

    try {
      await axios.patch(`http://localhost:4000/blogs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Blog updated successfully!");
      navigate("/blog");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to update blog.");
    }
  };

  if (loading)
    return (
      <Layout>
        <p className="text-center p-6">Loading…</p>
      </Layout>
    );

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-[#0a1d56] mb-6 ml-6">
        Update Blog
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 ml-6 mr-6 rounded-lg shadow-md border"
        encType="multipart/form-data"
      >
        <div>
          <label className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Short Description
          </label>
          <textarea
            className="w-full border px-3 py-2 rounded resize-none"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Content
          </label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label htmlFor="publish" className="text-sm text-gray-700">
            Publish this blog
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#0a1d56] text-white px-6 py-2 rounded hover:bg-blue-900 font-medium"
        >
          Update Blog
        </button>
      </form>
    </Layout>
  );
};

export default UpdateBlog;
