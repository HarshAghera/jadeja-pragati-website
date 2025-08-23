import type React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CircleUserRound,
  BookText,
  BookA,
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

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboard size={18} className="text-inherit flex-shrink-0" />,
  },
  {
    label: "Blog",
    to: "/blog",
    icon: <BookA size={18} className="text-inherit flex-shrink-0" />,
  },
  {
    label: "Contact",
    to: "/contact",
    icon: <CircleUserRound size={18} className="text-inherit flex-shrink-0" />,
  },
  {
    label: "Pages",
    to: "/pages",
    icon: <BookText size={18} className="text-inherit flex-shrink-0" />,
  },
];

const sidebarVariants = {
  hidden: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 },
  }),
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <AnimatePresence>
      <motion.aside
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={sidebarVariants}
        className="h-full w-full max-w-[16rem] bg-[#0a1d56] p-6 flex flex-col shadow-lg overflow-y-auto md:rounded-2xl md:m-4"
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
                    transition={{ type: "spring", stiffness: 300 }}
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

                      {/* Arrow Icon on hover */}
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
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
