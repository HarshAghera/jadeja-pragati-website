import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectType {
  _id: string;
  title: string;
  slug: string;
  hero?: {
    title?: string;
  };
  about?: {
    title?: string;
  };
  createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Project: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const url = `${API_BASE_URL}/projects/list`;

      const response = await fetch(url, {
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const projectsData = data.value?.data || data.data || [];
      const total = data.value?.total || data.total || 0;

      setProjects(projectsData);
      setTotalCount(total);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to fetch projects:", error);
        toast.error("Failed to fetch projects: " + error.message);
      } else {
        console.error("Unknown error occurred while fetching projects");
        toast.error("Unknown error occurred while fetching projects");
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, rowsPerPage, search]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (slug: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This project will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const response = await fetch(`${API_BASE_URL}/projects/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      setProjects((prev) => prev.filter((project) => project.slug !== slug));
      toast.success("Project deleted successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to delete project:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete the project: " + error.message,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      } else {
        console.error("Unknown error occurred while deleting project");
        await Swal.fire({
          title: "Error!",
          text: "Unknown error occurred while deleting the project.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
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
          <Link to="/projects/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#001f3f] hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold w-full sm:w-auto transition-all shadow-md"
            >
              + CREATE PROJECT
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative w-full sm:w-64 bg-white/20 backdrop-blur-md border border-gray-200/30 rounded-lg p-3 shadow-sm"
          >
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300/50 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm shadow-sm transition bg-white/30 backdrop-blur-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                  <th className="px-4 py-3">Project Title</th>
                  <th className="px-4 py-3">Hero Title</th>
                  <th className="px-4 py-3">About Title</th>
                  <th className="px-4 py-3">Date</th>
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
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : projects.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        No projects found.
                      </td>
                    </tr>
                  ) : (
                    projects.map((project, index) => (
                      <motion.tr
                        key={project._id}
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
                        <td className="px-4 py-3">{project.title}</td>
                        <td className="px-4 py-3">
                          {project.hero?.title || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          {project.about?.title || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(project.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <motion.div whileHover={{ scale: 1.2 }}>
                              <Link
                                to={`/projects/${project.slug}/edit`}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Pencil size={18} />
                              </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.2 }}>
                              <button
                                onClick={() => handleDelete(project.slug)}
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

export default Project;
