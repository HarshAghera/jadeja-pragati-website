"use client";

import type React from "react";
import { Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  return (
    <div className="bg-[#0a1d56] text-white p-4 mx-4 mt-4 rounded-2xl shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden text-white focus:outline-none flex-shrink-0"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex flex-col min-w-0">
          <h3 className="text-sm sm:text-lg md:text-2xl font-bold leading-tight break-words max-w-full">
            JADEJA PRAGATI (I) PRIVATE LIMITED
          </h3>
        </div>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-[#0a1d56]" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
        <div className="bg-white text-[#0a1d56] p-1 sm:p-2 rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover scale-125"
          />
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 md:text-lg rounded-full transition-all text-sm sm:text-base shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
