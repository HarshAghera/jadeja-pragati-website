import type React from "react"; 
import { Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -30,
      filter: "blur(4px)",
    },
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

      {/* Right Side */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-shrink-0"
      >
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.150, rotate: 5 }}
          whileTap={{ scale: 0.99, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white text-[#0a1d56] p-1 sm:p-2 rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center overflow-hidden"
        >
          <img
            src="https://img.freepik.com/premium-vector/stylish-businessman-profile-circle-vector-illustration_123673-428.jpg"
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover scale-135"
          />
        </motion.div>

        {/* Logout Button */}
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
