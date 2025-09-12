import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface PageType {
  _id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  subsubcategory: string;
  htmlContent?: string;
  showInNavbar: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Page: React.FC = () => {
  const [pages, setPages] = useState<PageType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return toast.error("User not authenticated");

      const response = await fetch(`${API_BASE_URL}/pages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        const pagesArray = data.value || [];
        pagesArray.sort((a: PageType, b: PageType) =>
          b._id.localeCompare(a._id)
        );
        setPages(pagesArray);
      } else {
        toast.error(data.message || "Failed to fetch pages");
      }
    } catch (error) {
      console.error("Fetch pages error:", error);
      toast.error("Error fetching pages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This page will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Delete failed");

      setPages((prev) => prev.filter((page) => page._id !== id));
      toast.success("Page deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete page.");
    }
  };

  const handleToggleNavbar = async (id: string, current: boolean) => {
    const token = localStorage.getItem("authToken");
    if (!token) return toast.error("Authentication token missing");

    const page = pages.find((p) => p._id === id);
    if (!page) return;

    const updatedPage = {
      title: page.title,
      slug: page.slug,
      htmlContent: page.htmlContent || "",
      showInNavbar: !current,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPage),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Toggle Navbar Error Response:", errorData);
        throw new Error(errorData.message || "Update failed");
      }

      setPages((prev) =>
        prev.map((p) => (p._id === id ? { ...p, showInNavbar: !current } : p))
      );

      toast.success(
        `Page ${!current ? "added to" : "removed from"} navbar successfully.`
      );
    } catch (err) {
      console.error("Toggle Navbar Exception:", err);
      toast.error("Failed to update navbar visibility.");
    }
  };

  const categories = Array.from(new Set(pages.map((p) => p.category)));

  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || page.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCount = filteredPages.length;
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
        >
          <Link to="/pages/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#001f3f] hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold w-full sm:w-auto transition-all shadow-md"
            >
              + CREATE PAGE
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto bg-white/20 backdrop-blur-md border border-gray-200/30 rounded-lg p-3 shadow-sm"
          >
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search pages..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300/50 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm shadow-sm transition bg-white/30 backdrop-blur-sm"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="18"
                height="18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>

            <div className="w-full sm:w-48">
              <select
                className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm transition bg-white/30 backdrop-blur-sm"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white shadow-2xl rounded-xl overflow-hidden"
        >
          <div className="p-6 overflow-x-auto">
            <table className="rounded-xl border border-gray-200 shadow-lg overflow-hidden w-full">
              <thead className="bg-[#001f3f] text-white">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Subcategory</th>
                  <th className="px-4 py-3">Subsubcategory</th>
                  <th className="px-4 py-3">Navbar</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <AnimatePresence>
                <motion.tbody
                  className="bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {loading ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-6 text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : paginatedPages.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-6 text-gray-500"
                      >
                        No pages found.
                      </td>
                    </tr>
                  ) : (
                    paginatedPages.map((page, index) => (
                      <motion.tr
                        key={page._id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          {(currentPage - 1) * rowsPerPage + index + 1}
                        </td>
                        <td className="px-4 py-3">{page.title}</td>
                        <td className="px-4 py-3">{page.slug}</td>
                        <td className="px-4 py-3">{page.category}</td>
                        <td className="px-4 py-3">{page.subcategory}</td>
                        <td className="px-4 py-3">{page.subsubcategory}</td>
                        <td className="px-4 py-3">
                          <label className="inline-flex items-center cursor-pointer relative">
                            <input
                              type="checkbox"
                              checked={page.showInNavbar}
                              onChange={() =>
                                handleToggleNavbar(page._id, page.showInNavbar)
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full peer-checked:after:translate-x-full after:transition-all" />
                          </label>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <motion.div whileHover={{ scale: 1.2 }}>
                              <Link
                                to={`/pages/update/${page.slug}`}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Pencil size={18} />
                              </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.2 }}>
                              <button
                                onClick={() => handleDelete(page._id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={18} />
                              </button>
                            </motion.div>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </motion.tbody>
              </AnimatePresence>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t px-6 py-4 gap-4"
          >
            <div>
              <label className="mr-2 text-sm">Rows per page:</label>
              <select
                className="border px-2 py-1 rounded text-sm"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
              </select>
            </div>
            <div className="text-sm flex flex-wrap items-center gap-2">
              {(currentPage - 1) * rowsPerPage + 1}–
              {Math.min(currentPage * rowsPerPage, totalCount)} of {totalCount}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`ml-2 px-2 py-1 rounded ${
                  currentPage === 1
                    ? "text-gray-300"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Previous
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`ml-2 px-2 py-1 rounded ${
                  currentPage === totalPages
                    ? "text-gray-300"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
