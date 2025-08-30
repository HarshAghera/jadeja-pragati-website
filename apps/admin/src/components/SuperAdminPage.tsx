"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Trash2, Pencil, UserPlus, Mail, UserCog } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type User = {
  _id: string;
  email: string;
  type: string;
  avatar?: string;
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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

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
      const user: User | null = data?.value
        ? {
            _id: data.value._id,
            email: data.value.email,
            type: data.value.type,
            avatar: data.value.avatar || undefined,
          }
        : null;

      setProfile(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setProfileError(err.message);
      } else {
        setProfileError("Failed to load profile.");
      }
      setProfile(null);
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
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`);
      } else {
        toast.error("Unknown error occurred.");
      }
    }
  };

  if (profile && !isSuperAdmin) {
    return null;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-10"
      >
        {/* Header with only Create User button (left side) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-start"
        >
          <motion.button
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/superadmin/CreateUser")}
            className="bg-[#001f3f] text-white px-6 py-3 rounded-xl flex items-center gap-2 
              hover:bg-blue-800 shadow-lg transition duration-300 text-base font-semibold"
          >
            <UserPlus size={22} />
            Create User
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#001f3f] mb-4 flex items-center gap-2">
            <UserCog className="text-[#001f3f]" size={22} />
            Your Profile
          </h2>

          {profile && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
              }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                className="flex-shrink-0"
              >
                <img
                  src={
                    profile.avatar ||
                    "https://img.freepik.com/premium-vector/stylish-businessman-profile-circle-vector-illustration_123673-428.jpg"
                  }
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-[#001f3f] shadow-md object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-gray-50 rounded-xl shadow-md px-6 py-5 transition-all duration-300 hover:shadow-xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-center group cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(profile.email);
                      toast.success("Email copied!", { position: "top-right" });
                    }}
                  >
                    <Mail
                      className="text-[#001f3f] mr-2 group-hover:scale-110 transition-transform duration-200"
                      size={18}
                    />
                    <span className="text-gray-500 text-sm font-medium w-16 group-hover:text-[#001f3f] transition-colors">
                      Email:
                    </span>
                    <span className="ml-2 text-gray-800 text-sm font-semibold break-all group-hover:text-blue-700 transition-colors group-hover:underline">
                      {profile.email}
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-center group cursor-default"
                  >
                    <UserCog
                      className="text-[#001f3f] mr-2 group-hover:scale-110 transition-transform duration-200"
                      size={18}
                    />
                    <span className="text-gray-500 text-sm font-medium w-16 group-hover:text-[#001f3f] transition-colors">
                      Role:
                    </span>
                    <span className="ml-2 text-gray-800 text-sm font-semibold capitalize group-hover:text-blue-700 transition-colors">
                      {profile.type}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white shadow-2xl rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-[#001f3f] mb-6">
            User Management
          </h2>

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
                        <th className="px-6 py-4">#</th>
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
