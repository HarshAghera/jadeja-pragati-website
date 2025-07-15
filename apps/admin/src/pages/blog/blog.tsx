import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

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

  const fetchBlogs = async () => {
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
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, rowsPerPage, search]);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/blog/create">
          <button className="bg-[#001f3f] hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold">
            + CREATE BLOG
          </button>
        </Link>

        <input
          type="text"
          placeholder="Search blogs..."
          className="border px-3 py-2 rounded shadow-sm w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
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
          <tbody className="bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center px-4 py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center px-4 py-6 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <tr key={blog._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{blog.title}</span>
                  </td>
                  <td className="px-4 py-3">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={blog.isPublished}
                        readOnly
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
                    </label>
                  </td>
                  <td className="px-4 py-3 flex gap-3 items-center">
                    <Link
                      to={`/blogs/${blog._id}/edit`}
                      title="Edit"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      title="Delete"
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
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
        <div className="text-sm flex items-center gap-2">
          {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, totalCount)} of {totalCount}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`ml-2 px-2 py-1 rounded ${
              currentPage === 1 ? "text-gray-300" : "text-gray-600 hover:text-black"
            }`}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`ml-2 px-2 py-1 rounded ${
              currentPage === totalPages ? "text-gray-300" : "text-blue-600 hover:text-blue-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
