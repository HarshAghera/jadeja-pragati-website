import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { ImagePlus } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog");

        const data: BlogAPIResponse = await response.json();
        const blog = data.value;

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
    };

    fetchBlog();
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

    const token = localStorage.getItem("authToken");
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
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blog");
      }

      toast.success(" Blog updated successfully!");
      setTimeout(() => navigate("/blog"), 1000);
    } catch (error: any) {
      console.error(" Update Blog Error:", error.message);
      toast.error("Failed to update blog. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center p-6">Loading…</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-[#0a1d56] mb-6 ml-6">Update Blog</h2>

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
          <label className="block font-medium mb-1 text-gray-700">Short Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded resize-none"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Image</label>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer border border-dashed border-gray-400 rounded-lg px-4 py-6 w-full sm:w-64 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 transition"
            >
              <ImagePlus className="w-8 h-8 mb-2" />
              <span className="text-sm text-center">Click to upload or drag & drop</span>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <div className="w-32 h-32 border rounded overflow-hidden bg-gray-100 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400 text-center">No image selected</span>
              )}
            </div>
          </div>
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
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </>
  );
};

export default UpdateBlog;
