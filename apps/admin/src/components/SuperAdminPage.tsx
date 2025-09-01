"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Trash2, Pencil, UserPlus } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type UserType = {
  _id: string;
  email: string;
  type: string;
  avatar?: string;
  createdAt?: string;
};

const getEmailFromToken = (token: string | null): string | null => {
  try {
    if (!token) return null;
    const [, payload] = token.split(".");
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(base64));
    return json?.email || json?.user_email || json?.sub || null;
  } catch {
    return null;
  }
};

const API_URL = import.meta.env.VITE_API_URL;

const SuperAdminPage: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserType | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch profile
  const fetchProfile = async () => {
    try {
      if (!API_URL) throw new Error("Missing VITE_API_URL. Set it in .env");
      setProfileError(null);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found. Please login first.");

      const storedEmail =
        localStorage.getItem("userEmail") ||
        localStorage.getItem("email") ||
        localStorage.getItem("authEmail");
      const email = storedEmail || getEmailFromToken(token);
      if (!email) throw new Error("Could not determine current user email.");

      const res = await fetch(`${API_URL}/users/${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
      const data = await res.json();
      const user: UserType | null = data?.value
        ? {
            _id: data.value._id,
            email: data.value.email,
            type: data.value.type,
            avatar: data.value.avatar || undefined,
            createdAt: data.value.createdAt || new Date().toISOString(),
          }
        : null;

      setProfile(user);
    } catch (err: unknown) {
      if (err instanceof Error) setProfileError(err.message);
      else setProfileError("Failed to load profile.");
      setProfile(null);
    }
  };

  const fetchUsers = async () => {
    try {
      if (!API_URL) throw new Error("Missing VITE_API_URL. Set it in .env");
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found. Please login first.");

      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error(`Failed to fetch users: ${response.status}`);

      const data = await response.json();
      setUsers(data?.value ?? []);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    fetchProfile();
  }, [navigate]);

  const isSuperAdmin = (profile?.type || "").toLowerCase() === "superadmin";

  useEffect(() => {
    if (profile) {
      if (!isSuperAdmin) {
        navigate("/", { replace: true });
        return;
      }
      fetchUsers();
    }
  }, [profile, isSuperAdmin, navigate]);

  useEffect(() => {
    if (profileError) {
      navigate("/login", { replace: true });
    }
  }, [profileError, navigate]);

  const handleDeleteUser = async (userId: string) => {
    if (!API_URL) {
      toast.error("Missing VITE_API_URL. Set it in .env");
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
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

      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete user");

      toast.success("User deleted successfully!");
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(`Error: ${err.message}`);
      else toast.error("Unknown error occurred.");
    }
  };

  if (profile && !isSuperAdmin) {
    return null;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-start"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/superadmin/addadmin")}
            className="bg-[#001f3f] hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold w-full sm:w-auto transition-all shadow-md flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            CREATE ADMIN
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white shadow-2xl rounded-2xl p-8"
        >
          {loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-blue-600 text-center"
            >
              Loading users...
            </motion.p>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-center"
            >
              {error}
            </motion.p>
          )}

          {!loading && !error && (
            <>
              {users.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg"
                >
                  <table className="min-w-full text-base text-left">
                    <thead className="bg-[#001f3f] text-white">
                      <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <AnimatePresence>
                        {users.map((user, index) => (
                          <motion.tr
                            key={user._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="odd:bg-gray-50 even:bg-white hover:shadow-md hover:bg-gray-100 transition"
                          >
                            <td className="px-6 py-4 text-gray-600">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4 capitalize">
                              {user.type}
                            </td>
                            <td className="px-6 py-4 flex justify-center gap-6">
                              <motion.button
                                whileHover={{ scale: 1.2, rotate: -3 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  navigate(
                                    `/superadmin/update-password/${user.email}`
                                  )
                                }
                                className="text-blue-600 hover:text-blue-700 transition"
                              >
                                <Pencil size={20} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.2, rotate: 3 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeleteUser(user._id)}
                                className="text-red-600 hover:text-red-700 transition"
                              >
                                <Trash2 size={20} />
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500"
                >
                  No users found.
                </motion.p>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuperAdminPage;
