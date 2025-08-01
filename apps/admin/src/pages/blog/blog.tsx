import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface BlogType {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  isPublished: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/blogs/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          page: currentPage,
          limit: rowsPerPage,
          sortBy: "createdAt",
          sortOrder: "desc",
          search,
        }),
      });

      if (!response.ok) throw new Error(`Status ${response.status}`);

      const { value } = await response.json();
      setBlogs(value.data);
      setTotalCount(value.total);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, rowsPerPage, search]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
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

      const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      await Swal.fire({
        title: "Deleted!",
        text: "Blog has been deleted.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Failed to delete blog:", error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete the blog.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    setBlogs((prev) =>
      prev.map((b) => (b._id === id ? { ...b, isPublished: !current } : b))
    );

    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !current }),
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);

      toast.success(
        `Blog ${!current ? "published" : "unpublished"} successfully`
      );
    } catch (error) {
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, isPublished: current } : b))
      );
      console.error("Failed to update publish status:", error);
      toast.error("Failed to update publish status.");
    }
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const goToPreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <motion.div
      className="p-4 sm:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <Link to="/blog/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#001f3f] hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold w-full sm:w-auto transition-all shadow-md"
          >
            + CREATE BLOG
          </motion.button>
        </Link>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm text-sm placeholder-gray-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
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
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#001f3f] text-white">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Publish</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <AnimatePresence>
            <motion.tbody
              className="bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center px-4 py-6 text-gray-500 animate-pulse"
                  >
                    Loading...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center px-4 py-6 text-gray-500"
                  >
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.map((blog, index) => (
                  <motion.tr
                    key={blog._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-3 max-w-[240px] sm:max-w-none">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-14 h-14 object-cover rounded-md shrink-0"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 break-words whitespace-normal">
                            {blog.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={blog.isPublished}
                          onChange={() =>
                            handleTogglePublish(blog._id, blog.isPublished)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
                      </label>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center gap-3 h-full">
                        <motion.div whileHover={{ scale: 1.2 }}>
                          <Link
                            to={`/blogs/${blog._id}/edit`}
                            title="Edit"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Pencil size={18} />
                          </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}>
                          <button
                            title="Delete"
                            onClick={() => handleDelete(blog._id)}
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
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
      </div>
    </motion.div>
  );
};

export default Blog;
