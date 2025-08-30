import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  email: string;
  type: string;
  avatar?: string | null;
};

const API_URL = import.meta.env.VITE_API_URL;

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

const CreateUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "admin";
  const navigate = useNavigate();

  const [profile, setProfile] = useState<User | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      if (!API_URL) throw new Error("Missing VITE_API_URL. Set it in .env");
      setProfileError(null);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

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
            avatar: data.value.avatar || null,
          }
        : null;

      setProfile(user);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load profile.";
      setProfileError(message);
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
        navigate("/", { replace: true }); // 🚫 kick out non-superadmins
      }
    }
  }, [profile, isSuperAdmin, navigate]);

  useEffect(() => {
    if (profileError) {
      navigate("/login", { replace: true });
    }
  }, [profileError, navigate]);

  const handleCreateUser = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          password,
          type: role,
        }),
      });

      if (!response.ok) throw new Error("Failed to create user");

      toast.success("Admin user created successfully!");

      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/superadmin"), 1500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Error: ${message}`);
    }
  };

  if (profile && !isSuperAdmin) {
    return null;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg relative 
                   max-sm:max-w-sm max-sm:p-6 max-sm:rounded-xl"
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-[#001f3f] transition-all text-base 
                     max-sm:text-sm max-sm:gap-1"
        >
          <ArrowLeft size={20} className="max-sm:size-5" />
          <span className="max-sm:hidden">Back</span>
        </button>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-6 mt-6"
        >
          <div className="bg-[#001f3f] p-4 max-sm:p-2.5 rounded-full shadow-lg">
            <UserPlus size={32} className="text-white max-sm:size-10" />
          </div>
          <h2
            className="text-3xl font-bold mt-4 text-gray-800 text-center 
                         max-sm:text-xl max-sm:mt-3"
          >
            Create Admin User
          </h2>
          <p
            className="text-gray-500 text-sm mt-2 text-center 
                        max-sm:text-xs max-sm:mt-1"
          >
            Fill in the details to add a new admin account.
          </p>
        </motion.div>

        <div className="relative mb-4">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-10 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#001f3f] outline-none transition-all text-base 
                       max-sm:text-sm max-sm:px-9 max-sm:py-2.5"
          />
        </div>

        <div className="relative mb-6">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-10 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#001f3f] outline-none transition-all text-base 
                       max-sm:text-sm max-sm:px-9 max-sm:py-2.5"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreateUser}
          className="bg-[#001f3f] text-white px-6 py-3 rounded-lg w-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-blue-900 shadow-lg transition-all 
                     max-sm:text-sm max-sm:px-4 max-sm:py-2.5"
        >
          <UserPlus size={20} className="max-sm:size-5" />
          Create Admin
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CreateUser;
