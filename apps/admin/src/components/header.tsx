"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface HeaderProps {
  onMenuClick?: () => void;
}

type User = {
  _id: string;
  email: string;
  type: string;
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

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);

  const fetchProfile = async () => {
    try {
      if (!API_URL) throw new Error("Missing VITE_API_URL");
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
      setProfile(
        data?.value
          ? {
              _id: data.value._id,
              email: data.value.email,
              type: data.value.type,
            }
          : null
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Profile error:", err.message);
      } else {
        console.error("Profile error:", err);
      }
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleProfileClick = () => {
    if (profile?.type?.toLowerCase() === "superadmin") {
      navigate("/superadmin");
    } else {
      toast.error("You don’t have access to the Superadmin page.");
    }
  };

  const avatarUrl =
    profile?.type?.toLowerCase() === "superadmin"
      ? "https://img.freepik.com/premium-vector/stylish-businessman-profile-circle-vector-illustration_123673-428.jpg"
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkq0k0XsXaUViO7OX7JVyp3QUSYEzmetopEg&s";

  const containerVariants = {
    hidden: { opacity: 0, y: -30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#0a1d56] text-white p-4 md:p-4 mx-4 md:mx-4 mt-4 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 md:gap-4 flex-1 w-full sm:w-auto"
      >
        <motion.button
          onClick={onMenuClick}
          whileTap={{ scale: 0.9, rotate: -15 }}
          className="md:hidden text-white focus:outline-none flex-shrink-0"
        >
          <Menu className="w-6 h-6" />
        </motion.button>

        <div className="flex flex-col min-w-0 w-full sm:w-auto">
          <motion.h3
            variants={textVariants}
            className="text-sm sm:text-lg md:text-2xl font-bold leading-tight break-words max-w-full text-center sm:text-left"
          >
            JADEJA PRAGATI (I) PRIVATE LIMITED
          </motion.h3>
        </div>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-[#0a1d56]" />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-shrink-0"
      >
        <motion.div
          onClick={handleProfileClick}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.99, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="bg-white text-[#0a1d56] p-1 sm:p-2 rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center overflow-hidden">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover scale-135"
            />
          </div>
          <span className="text-xs sm:text-sm text-white mt-1">
            User Profile
          </span>
        </motion.div>

        <motion.button
          onClick={handleLogout}
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 0.5rem rgba(255,255,255,0.6)",
          }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 md:text-lg rounded transition-all text-sm sm:text-base shadow-md"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Header;
