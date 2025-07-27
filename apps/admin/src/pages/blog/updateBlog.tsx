import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { ImagePlus, ArrowLeft } from "lucide-react";

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

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "bullet",
  "indent",
  "align",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
];

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
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Failed to fetch blog data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        toast.error("Image must be under 500KB.");
        return;
      }
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
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blog");
      }

      toast.success("Blog updated successfully!");
      setTimeout(() => navigate("/blog"), 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Update Blog Error:", error.message);
        toast.error(error.message || "Failed to update blog.");
      } else {
        console.error("Update Blog Error:", error);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center p-6">Loading…</p>;

  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d56] text-center sm:text-left w-full sm:w-auto">
          Update Blog
        </h2>

        <button
          type="button"
          onClick={() => navigate("/blog")}
          className="flex items-center bg-[#0a1d56] hover:bg-blue-900 text-white px-4 py-2 rounded font-medium transition-all w-full sm:w-fit justify-center sm:justify-end"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Blogs
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md border"
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
            rows={3}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Content
          </label>
          <ReactQuill
            className="bg-white"
            theme="snow"
            value={content}
            onChange={setContent}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Image</label>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer border border-dashed border-gray-400 rounded-lg px-4 py-6 w-full sm:w-64 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 transition"
            >
              <ImagePlus className="w-8 h-8 mb-2" />
              <span className="text-sm text-center">
                Click to upload or drag & drop
              </span>
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
                <span className="text-sm text-gray-400 text-center">
                  No image
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2 italic">
            Please ensure the image is under 500KB.
          </p>
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
          className="bg-[#0a1d56] text-white px-6 py-2 rounded hover:bg-blue-900 font-medium w-full sm:w-auto"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
