"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ImagePlus, ArrowLeft, Plus, Trash2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface ProjectAPIResponse {
  value: {
    _id: string;
    title: string;
    slug: string;
    hero: {
      title: string;
      description: string;
    };
    about: {
      title: string;
      description: string;
      imageUrl?: string;
    };
    cards: Array<{
      title: string;
      description: string;
      imageUrl?: string;
    }>;
    whoNeeds: {
      title: string;
      description: string;
      points: string[];
      imageUrl?: string;
    };
    documents: {
      title: string;
      paragraph: string;
      items: string[];
    };
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  error: boolean;
}

const UpdateProject = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [slugField, setSlugField] = useState("");

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
  >([{ title: "", description: "" }]);
  const [cardImagesPreview, setCardImagesPreview] = useState<(string | null)[]>(
    [null]
  );

  const [whoNeedsTitle, setWhoNeedsTitle] = useState("");
  const [whoNeedsDescription, setWhoNeedsDescription] = useState("");
  const [whoNeedsPoints, setWhoNeedsPoints] = useState<string[]>([""]);
  const [whoNeedsImage, setWhoNeedsImage] = useState<File | null>(null);
  const [whoNeedsImagePreview, setWhoNeedsImagePreview] = useState<
    string | null
  >(null);

  const [documentsTitle, setDocumentsTitle] = useState("");
  const [documentsParagraph, setDocumentsParagraph] = useState("");
  const [documentsItems, setDocumentsItems] = useState<string[]>([""]);

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    { question: "", answer: "" },
  ]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setPreview: (preview: string | null) => void,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
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
    }
  };

  const addCard = () => {
    setCards([...cards, { title: "", description: "" }]);
    setCardImagesPreview([...cardImagesPreview, null]);
  };

  const removeCard = (index: number) => {
    if (cards.length <= 1) return;
    const newCards = cards.filter((_, i) => i !== index);
    const newPreviews = cardImagesPreview.filter((_, i) => i !== index);
    setCards(newCards);
    setCardImagesPreview(newPreviews);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    if (faqs.length <= 1) return;
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const addWhoNeedsPoint = () => {
    setWhoNeedsPoints([...whoNeedsPoints, ""]);
  };

  const removeWhoNeedsPoint = (index: number) => {
    if (whoNeedsPoints.length <= 1) return;
    setWhoNeedsPoints(whoNeedsPoints.filter((_, i) => i !== index));
  };

  const addDocumentItem = () => {
    setDocumentsItems([...documentsItems, ""]);
  };

  const removeDocumentItem = (index: number) => {
    if (documentsItems.length <= 1) return;
    setDocumentsItems(documentsItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !heroTitle || !heroDescription || !slugField) {
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
    formData.append("slug", slugField);
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

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/projects/${slug}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update project");
      }

      toast.success("Project updated successfully!");
      setTimeout(() => navigate("/projects"), 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Update Project Error:", error.message);
        toast.error(error.message || "Failed to update project.");
      } else {
        console.error("Update Project Error:", error);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch project");

        const data: ProjectAPIResponse = await response.json();
        const project = data.value;

        setTitle(project.title);
        setSlugField(project.slug);
        setHeroTitle(project.hero?.title || "");
        setHeroDescription(project.hero?.description || "");
        setAboutTitle(project.about?.title || "");
        setAboutDescription(project.about?.description || "");
        setAboutImagePreview(project.about?.imageUrl || null);

        setCards(
          project.cards && project.cards.length > 0
            ? project.cards.map((card) => ({
                title: card.title || "",
                description: card.description || "",
              }))
            : [{ title: "", description: "" }]
        );
        setCardImagesPreview(
          project.cards?.map((card) => card.imageUrl || null) || [null]
        );

        setWhoNeedsTitle(project.whoNeeds?.title || "");
        setWhoNeedsDescription(project.whoNeeds?.description || "");
        setWhoNeedsPoints(
          project.whoNeeds?.points && project.whoNeeds.points.length > 0
            ? project.whoNeeds.points
            : [""]
        );
        setWhoNeedsImagePreview(project.whoNeeds?.imageUrl || null);

        setDocumentsTitle(project.documents?.title || "");
        setDocumentsParagraph(project.documents?.paragraph || "");
        setDocumentsItems(
          project.documents?.items && project.documents.items.length > 0
            ? project.documents.items
            : [""]
        );

        setFaqs(
          project.faqs && project.faqs.length > 0
            ? project.faqs
            : [{ question: "", answer: "" }]
        );
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Failed to fetch project data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) return <p className="text-center p-6">Loading…</p>;

  return (
    <div className="px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0a1d56] text-center sm:text-left">
          Update Project
        </h2>

        <button
          type="button"
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
        encType="multipart/form-data"
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
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 text-gray-500"
                value={slugField}
                readOnly
                disabled
              />
              <p className="text-sm text-gray-500">
                Slug cannot be changed when updating
              </p>
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
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Hero Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                required
                placeholder="Enter hero description"
                rows={6}
                style={{ minHeight: "160px" }}
              />
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
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                About Description
              </label>
              <textarea
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                value={aboutDescription}
                onChange={(e) => setAboutDescription(e.target.value)}
                placeholder="Enter about description"
                rows={8}
                style={{ minHeight: "192px" }}
              />
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
                      handleImageChange(e, setAboutImage, setAboutImagePreview)
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
                          handleImageChange(
                            e,
                            () => {},
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
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                value={whoNeedsDescription}
                onChange={(e) => setWhoNeedsDescription(e.target.value)}
                placeholder="Enter who needs description"
                rows={6}
                style={{ minHeight: "160px" }}
              />
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
                      handleImageChange(
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
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                value={documentsParagraph}
                onChange={(e) => setDocumentsParagraph(e.target.value)}
                placeholder="Enter documents description"
                rows={6}
                style={{ minHeight: "160px" }}
              />
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
            className={`${
              submitting ? "opacity-60 cursor-not-allowed" : ""
            } bg-[#0a1d56] hover:bg-blue-900 text-white px-8 py-2 rounded shadow font-semibold transition`}
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
