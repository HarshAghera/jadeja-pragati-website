import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="bg-[#0a1d56] text-white p-4 mx-4 mt-4 rounded-2xl shadow-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile menu icon (only visible on small screens) */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-white focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold">JADEJA PRAGATI (I) PRIVATE LIMITED</h3>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-[#0a1d56]" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white text-[#0a1d56] p-2 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover scale-155"
          />
        </div>

        <Link to="/">
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full transition-all">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
