import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL;

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

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const UpdatePage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [pageId, setPageId] = useState("");
  const [title, setTitle] = useState("");
  const [slugInput, setSlugInput] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subsubcategory, setSubsubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [showInNavbar, setShowInNavbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;

      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/pages/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 404) {
          toast.error("Page not found");
          navigate("/pages");
          return;
        }

        if (!response.ok)
          throw new Error(`Failed to fetch page: ${response.status}`);

        const data = await response.json();
        const page = data.value || data;

        setPageId(page._id || "");
        setTitle(page.title || "");
        setSlugInput(page.slug || "");
        setCategory(page.category || "");
        setSubcategory(page.subcategory || "");
        setSubsubcategory(page.subsubcategory || "");
        setDescription(page.description || "");
        setHtmlContent(page.htmlContent || "");
        setShowInNavbar(page.showInNavbar || false);
      } catch (error: unknown) {
        toast.error(
          error instanceof Error ? error.message : "Error loading page"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !htmlContent || !category || !slugInput) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Not authenticated");

      setIsSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/pages/${pageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          slug: slugInput,
          category,
          subcategory,
          subsubcategory,
          description,
          htmlContent,
          showInNavbar,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        toast.error(` Error ${res.status}: ${text}`);
        return;
      }

      toast.success(" Page updated successfully!");
      setTimeout(() => navigate("/pages"), 1500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(` ${error.message}`);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  return (
    <motion.div
      className="w-full px-4 py-8 sm:px-6 lg:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0a1d56]">
          Update Page
        </h1>
        <button
          onClick={() => navigate("/pages")}
          className="flex items-center bg-[#0a1d56] hover:bg-blue-900 text-white px-5 py-2 rounded shadow transition-all"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Pages
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 sm:p-10 rounded-2xl shadow-xl border space-y-6"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Title</label>
              <input
                type="text"
                className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Category</label>
              <select
                className="border px-4 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Consulting">Consulting</option>
                <option value="Business">Business</option>
                <option value="Waste">Waste</option>
                <option value="EPR">EPR</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">
                Subcategory
              </label>
              <input
                type="text"
                className="border px-4 py-2 rounded focus:outline-none"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">
                Subsubcategory
              </label>
              <input
                type="text"
                className="border px-4 py-2 rounded focus:outline-none"
                value={subsubcategory}
                onChange={(e) => {
                  const value = e.target.value;
                  setSubsubcategory(value);
                  setSlugInput(generateSlug(value));
                }}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Slug</label>
            <input
              type="text"
              className="border px-4 py-2 rounded focus:outline-none"
              value={slugInput}
              onChange={(e) => setSlugInput(e.target.value)}
              required
            />
          </div>
          <div className="container mx-auto p-1">
            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700">
                Description
              </label>
              <div className="w-full md:h-40 lg:h-56">
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                  className="h-full"
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto p-1">
            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700">
                HTML Content
              </label>
              <div className="w-full md:h-40 lg:h-56">
                <ReactQuill
                  value={htmlContent}
                  onChange={setHtmlContent}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showInNavbar"
            checked={showInNavbar}
            onChange={(e) => setShowInNavbar(e.target.checked)}
          />
          <label htmlFor="showInNavbar" className="text-sm text-gray-700">
            Show in Navbar
          </label>
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "opacity-60 cursor-not-allowed" : ""
            } bg-[#0a1d56] hover:bg-blue-900 text-white px-8 py-2 rounded shadow font-semibold transition`}
          >
            {isSubmitting ? "Updating..." : "Update Page"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default UpdatePage;
