import type React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  CircleUserRound,
  BookText,
  BookA,
  UserCog,
  X,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  onClose?: () => void;
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

const sidebarVariants = {
  hidden: {
    x: "-100%",
    opacity: 0,
    scale: 0.98,
    transition: {
      ease: "easeInOut",
      duration: 0.4,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

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
        console.error("Sidebar profile error:", err.message);
      } else {
        console.error("Sidebar profile error:", err);
      }
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: (
        <LayoutDashboard size={18} className="text-inherit flex-shrink-0" />
      ),
    },
    {
      label: "Blog",
      to: "/blog",
      icon: <BookA size={18} className="text-inherit flex-shrink-0" />,
    },
    {
      label: "Contact",
      to: "/contact",
      icon: (
        <CircleUserRound size={18} className="text-inherit flex-shrink-0" />
      ),
    },
    {
      label: "Pages",
      to: "/pages",
      icon: <BookText size={18} className="text-inherit flex-shrink-0" />,
    },
  ];

  navItems.push({
    label: "Project",
    to: "/projects",
    icon: <Globe size={18} className="text-inherit flex-shrink-0" />, // change icon if needed
  });

  if (profile?.type?.toLowerCase() === "superadmin") {
    navItems.push({
      label: "Manage Admin",
      to: "/superadmin",
      icon: <UserCog size={18} className="text-inherit flex-shrink-0" />,
    });
  }

  return (
    <AnimatePresence>
      {onClose && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={sidebarVariants}
        className="fixed left-0 top-0 z-50 h-full w-full max-w-[16rem] bg-[#0a1d56] p-6 flex flex-col shadow-xl overflow-y-auto md:relative md:rounded-2xl md:m-4"
      >
        {onClose && (
          <div className="flex justify-end mb-4 md:hidden">
            <button onClick={onClose} className="text-white">
              <X size={24} />
            </button>
          </div>
        )}

        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2 text-center">
            {navItems.map(({ label, to, icon }, index) => {
              const active = isActive(to);
              return (
                <motion.li
                  key={to}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 250 }}
                    className="group"
                  >
                    <Link
                      to={to}
                      onClick={onClose}
                      className={`flex items-center justify-between pl-4 pr-3 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                        active
                          ? "bg-white text-[#0a1d56] font-semibold shadow-md"
                          : "text-white hover:bg-[#132c72] hover:text-white"
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-5 h-5">
                          {icon}
                        </span>
                        <span className="text-sm font-medium">{label}</span>
                      </div>

                      <motion.div
                        initial={{ x: -8, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ ease: "easeOut", duration: 0.25 }}
                        className="opacity-0 group-hover:opacity-100 text-white md:text-[#0a1d56]"
                      >
                        <ChevronRight size={18} />
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </motion.aside>
    </AnimatePresence>
  );
};

export default Sidebar;
