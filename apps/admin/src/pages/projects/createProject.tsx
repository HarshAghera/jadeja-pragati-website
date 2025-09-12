"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus, Trash2, ArrowLeft, ImagePlus } from "lucide-react";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const CreateProject: React.FC = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");

  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  const [aboutImage, setAboutImage] = useState<File | null>(null);
  const [aboutImagePreview, setAboutImagePreview] = useState<string | null>(
    null
  );

  const [cards, setCards] = useState<
    { title: string; description: string; image?: File }[]
  >([
    { title: "", description: "" },
    { title: "", description: "" },
  ]);
  const [cardImagesPreview, setCardImagesPreview] = useState<(string | null)[]>(
    [null, null]
  );

  const [whoNeedsTitle, setWhoNeedsTitle] = useState("");
  const [whoNeedsDescription, setWhoNeedsDescription] = useState("");
  const [whoNeedsPoints, setWhoNeedsPoints] = useState<string[]>(["", "", ""]);
  const [whoNeedsImage, setWhoNeedsImage] = useState<File | null>(null);
  const [whoNeedsImagePreview, setWhoNeedsImagePreview] = useState<
    string | null
  >(null);

  const [documentsTitle, setDocumentsTitle] = useState("");
  const [documentsParagraph, setDocumentsParagraph] = useState("");
  const [documentsItems, setDocumentsItems] = useState<string[]>(["", "", ""]);

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    // Generate slug from full title, not just first letter
    setSlug(generateSlug(value));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setPreview: (preview: string | null) => void,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error("Image must be under 500KB.");
      return;
    }

    if (index !== undefined) {
      const cardsCopy = [...cards];
      cardsCopy[index].image = file;
      setCards(cardsCopy);

      const previewCopy = [...cardImagesPreview];
      previewCopy[index] = URL.createObjectURL(file);
      setCardImagesPreview(previewCopy);
    } else {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const addCard = () => {
    setCards([...cards, { title: "", description: "" }]);
    setCardImagesPreview([...cardImagesPreview, null]);
  };

  const removeCard = (index: number) => {
    if (cards.length <= 1) return;
    setCards(cards.filter((_, i) => i !== index));
    setCardImagesPreview(cardImagesPreview.filter((_, i) => i !== index));
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index: number) => {
    if (faqs.length <= 1) return;
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const addWhoNeedsPoint = () => setWhoNeedsPoints([...whoNeedsPoints, ""]);
  const removeWhoNeedsPoint = (index: number) => {
    if (whoNeedsPoints.length <= 1) return;
    setWhoNeedsPoints(whoNeedsPoints.filter((_, i) => i !== index));
  };

  const addDocumentItem = () => setDocumentsItems([...documentsItems, ""]);
  const removeDocumentItem = (index: number) => {
    if (documentsItems.length <= 1) return;
    setDocumentsItems(documentsItems.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!slug.trim()) newErrors.slug = "Slug is required";
    if (!heroTitle.trim()) newErrors.heroTitle = "Hero title is required";
    if (!heroDescription.trim())
      newErrors.heroDescription = "Hero description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("No token found. Please login.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("hero[title]", heroTitle);
    formData.append("hero[description]", heroDescription);
    formData.append("about[title]", aboutTitle);
    formData.append("about[description]", aboutDescription);
    if (aboutImage) formData.append("aboutImage", aboutImage);

    cards.forEach((card, i) => {
      formData.append(`cards[${i}][title]`, card.title);
      formData.append(`cards[${i}][description]`, card.description);
      if (card.image) formData.append(`cardImages`, card.image);
    });

    formData.append("whoNeeds[title]", whoNeedsTitle);
    formData.append("whoNeeds[description]", whoNeedsDescription);
    whoNeedsPoints.forEach((point, i) =>
      formData.append(`whoNeeds[points][${i}]`, point)
    );
    if (whoNeedsImage) formData.append("whoNeedsImage", whoNeedsImage);

    formData.append("documents[title]", documentsTitle);
    formData.append("documents[paragraph]", documentsParagraph);
    documentsItems.forEach((item, i) =>
      formData.append(`documents[items][${i}]`, item)
    );

    faqs.forEach((faq, i) => {
      formData.append(`faqs[${i}][question]`, faq.question);
      formData.append(`faqs[${i}][answer]`, faq.answer);
    });

    const toastId = toast.loading("Creating project...");
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create project");
      }
      toast.update(toastId, {
        render: "Project created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => navigate("/projects"), 1500);
    } catch (err: unknown) {
      toast.update(toastId, {
        render: err instanceof Error ? err.message : "Unknown error",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full px-4 py-8 sm:px-6 lg:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0a1d56] text-center sm:text-left">
          Create New Project
        </h2>
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center bg-[#0a1d56] hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all w-full sm:w-fit justify-center sm:justify-end"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Projects
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                placeholder="Enter project title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.slug ? "border-red-500" : "border-gray-300"
                }`}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                placeholder="project-slug"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
            Hero Section
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Hero Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.heroTitle ? "border-red-500" : "border-gray-300"
                }`}
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                required
                placeholder="Enter hero title"
              />
              {errors.heroTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.heroTitle}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Hero Description <span className="text-red-500">*</span>
              </label>
              <div className="h-40 border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  value={heroDescription}
                  onChange={setHeroDescription}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                  className="h-full"
                />
              </div>
              {errors.heroDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.heroDescription}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
            About Section
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                About Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={aboutTitle}
                onChange={(e) => setAboutTitle(e.target.value)}
                placeholder="Enter about title"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                About Description
              </label>
              <div className="h-48 border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  value={aboutDescription}
                  onChange={setAboutDescription}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                  className="h-full"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block font-medium text-gray-700">
                About Image
              </label>
              <div className="flex flex-col lg:flex-row gap-6">
                <label
                  htmlFor="aboutImageUpload"
                  className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl px-6 py-8 w-full lg:w-80 h-40 flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  <ImagePlus className="w-10 h-10 mb-3" />
                  <span className="text-sm font-medium text-center">
                    Choose Image
                  </span>
                  <input
                    id="aboutImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(e, setAboutImage, setAboutImagePreview)
                    }
                    className="hidden"
                  />
                </label>

                <div className="w-full lg:w-40 h-40 border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                  {aboutImagePreview ? (
                    <img
                      src={aboutImagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400 text-center px-4">
                      No image selected
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">
                Please ensure the image is under 500KB.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 flex-1">
              Feature Cards
            </h3>
            <button
              type="button"
              onClick={addCard}
              className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </button>
          </div>
          <div className="space-y-6">
            {cards.map((card, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50 relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Card {i + 1}
                  </h4>
                  {cards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCard(i)}
                      className="flex items-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-colors font-medium"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                      value={card.title}
                      onChange={(e) => {
                        const copy = [...cards];
                        copy[i].title = e.target.value;
                        setCards(copy);
                      }}
                      placeholder="Enter card title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                      value={card.description}
                      onChange={(e) => {
                        const copy = [...cards];
                        copy[i].description = e.target.value;
                        setCards(copy);
                      }}
                      placeholder="Enter card description"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block font-medium text-gray-700">
                    Card Image
                  </label>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <label
                      htmlFor={`cardImageUpload${i}`}
                      className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl px-6 py-8 w-full lg:w-80 h-40 flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:bg-blue-50 transition-all bg-white"
                    >
                      <ImagePlus className="w-10 h-10 mb-3" />
                      <span className="text-sm font-medium text-center">
                        Choose Image
                      </span>
                      <input
                        id={`cardImageUpload${i}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(
                            e,
                            (file: File | null) => {
                              const copy = [...cards];
                              copy[i].image = file ?? undefined;
                              setCards(copy);
                            },
                            () => {},
                            i
                          )
                        }
                        className="hidden"
                      />
                    </label>

                    <div className="w-full lg:w-40 h-40 border-2 border-gray-200 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                      {cardImagesPreview[i] ? (
                        <img
                          src={cardImagesPreview[i]! || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm text-gray-400 text-center px-4">
                          No image selected
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    Please ensure the image is under 500KB.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
            Who Needs This
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={whoNeedsTitle}
                onChange={(e) => setWhoNeedsTitle(e.target.value)}
                placeholder="Enter who needs title"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Description
              </label>
              <div className="h-40 border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  value={whoNeedsDescription}
                  onChange={setWhoNeedsDescription}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                  className="h-full"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <label className="block font-medium text-gray-700">
                  Target Points
                </label>
                <button
                  type="button"
                  onClick={addWhoNeedsPoint}
                  className="flex items-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Add Point
                </button>
              </div>
              <div className="space-y-3">
                {whoNeedsPoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={point}
                      placeholder={`Point ${i + 1}`}
                      onChange={(e) => {
                        const copy = [...whoNeedsPoints];
                        copy[i] = e.target.value;
                        setWhoNeedsPoints(copy);
                      }}
                    />
                    {whoNeedsPoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWhoNeedsPoint(i)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 p-3 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="block font-medium text-gray-700">
                Section Image
              </label>
              <div className="flex flex-col lg:flex-row gap-6">
                <label
                  htmlFor="whoNeedsImageUpload"
                  className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl px-6 py-8 w-full lg:w-80 h-40 flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  <ImagePlus className="w-10 h-10 mb-3" />
                  <span className="text-sm font-medium text-center">
                    Choose Image
                  </span>
                  <input
                    id="whoNeedsImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setWhoNeedsImage,
                        setWhoNeedsImagePreview
                      )
                    }
                    className="hidden"
                  />
                </label>

                <div className="w-full lg:w-40 h-40 border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                  {whoNeedsImagePreview ? (
                    <img
                      src={whoNeedsImagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400 text-center px-4">
                      No image selected
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">
                Please ensure the image is under 500KB.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
            Required Documents
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Section Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={documentsTitle}
                onChange={(e) => setDocumentsTitle(e.target.value)}
                placeholder="Enter documents section title"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Description
              </label>
              <div className="h-40 border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  value={documentsParagraph}
                  onChange={setDocumentsParagraph}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                  className="h-full"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <label className="block font-medium text-gray-700">
                  Document Items
                </label>
                <button
                  type="button"
                  onClick={addDocumentItem}
                  className="flex items-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Add Item
                </button>
              </div>
              <div className="space-y-3">
                {documentsItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={item}
                      placeholder={`Document ${i + 1}`}
                      onChange={(e) => {
                        const copy = [...documentsItems];
                        copy[i] = e.target.value;
                        setDocumentsItems(copy);
                      }}
                    />
                    {documentsItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDocumentItem(i)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 p-3 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 flex-1">
              Frequently Asked Questions
            </h3>
            <button
              type="button"
              onClick={addFaq}
              className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </button>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50 relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">
                    FAQ {i + 1}
                  </h4>
                  {faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(i)}
                      className="flex items-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-colors font-medium"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  )}
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700">
                      Question
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                      value={faq.question}
                      onChange={(e) => {
                        const copy = [...faqs];
                        copy[i].question = e.target.value;
                        setFaqs(copy);
                      }}
                      placeholder="Enter question"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700">
                      Answer
                    </label>
                    <textarea
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white resize-vertical min-h-[120px]"
                      value={faq.answer}
                      onChange={(e) => {
                        const copy = [...faqs];
                        copy[i].answer = e.target.value;
                        setFaqs(copy);
                      }}
                      placeholder="Enter the answer..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-start pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            } bg-[#0a1d56] hover:bg-blue-900 text-white px-8 py-2 rounded shadow font-semibold transition`}
          >
            {isLoading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateProject;
