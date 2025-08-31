"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Trash2,
  Pencil,
  UserPlus,
  Mail,
  UserCog,
  User,
  LogOut,
} from "lucide-react";
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 500);
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
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/superadmin/addadmin")}
            className="bg-[#001f3f] text-white px-6 py-3 rounded-xl flex items-center gap-2 
              hover:bg-blue-800 shadow-lg transition duration-300 text-base font-semibold"
          >
            <UserPlus size={22} />
            Create Admin
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

        {profile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white shadow-xl rounded-2xl overflow-hidden"
          >
            <div className="h-32 w-full bg-[#001f3f] rounded-t-2xl relative flex items-center px-5">
              <User className="text-white w-8 h-8 mr-3" />
              <h2 className="text-white text-2xl font-bold">Your Profile</h2>
            </div>

            <div className="p-6">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-6"
                >
                  <motion.div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 w-full">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.3,
                      }}
                      className="relative w-28 h-28 flex-shrink-0"
                    >
                      <img
                        src={
                          profile.avatar ||
                          "https://img.freepik.com/premium-vector/stylish-businessman-profile-circle-vector-illustration_123673-428.jpg"
                        }
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover shadow-md"
                      />
                    </motion.div>

                    <motion.div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          navigator.clipboard.writeText(profile.email);
                          toast.success("Email copied!");
                        }}
                        className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition flex-1"
                      >
                        <Mail className="text-blue-500" size={20} />
                        <div>
                          <p className="text-gray-500 text-xs">Email</p>
                          <p className="text-gray-800 font-semibold text-sm break-all">
                            {profile.email}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 flex-1"
                      >
                        <UserCog className="text-purple-500" size={20} />
                        <div>
                          <p className="text-gray-500 text-xs">Role</p>
                          <p className="text-gray-800 font-semibold capitalize">
                            {profile.type}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <motion.div className="flex justify-center mt-6">
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 0.5rem rgba(239,68,68,0.6)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 text-lg rounded shadow-lg transition flex items-center gap-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </motion.button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SuperAdminPage;
