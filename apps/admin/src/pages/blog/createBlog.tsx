import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !shortDescription || !content || !image) {
      toast.error("All fields—including image—are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", shortDescription);
    formData.append("content", content);
    formData.append("isPublished", String(isPublished));
    formData.append("image", image);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const res = await axios.post(`${API_BASE_URL}/blogs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog created successfully!");
      navigate("/blog");
    } catch (err: any) {
      console.error("❌ Create Blog Error:", err.response?.data || err.message);
      toast.error("Failed to create blog. Check console for details.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#0a1d56] mb-6">Create Blog</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md border"
        encType="multipart/form-data"
      >
        {/* Title */}
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

        {/* Short description */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Short Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded border" />
          )}
        </div>

        {/* Publish */}
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
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
