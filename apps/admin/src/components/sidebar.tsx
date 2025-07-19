import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Mail, BookText, X } from "lucide-react";

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
    icon: <BookText size={18} className="text-inherit flex-shrink-0" />,
  },
  {
    label: "Contact Submissions",
    to: "/contact",
    icon: <Mail size={18} className="text-inherit flex-shrink-0" />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="h-full w-full max-w-[16rem] bg-[#0a1d56] p-6 flex flex-col shadow-lg overflow-y-auto md:rounded-2xl md:m-4">
      {/* Close button for mobile */}
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
          {navItems.map(({ label, to, icon }) => {
            const active = isActive(to);
            return (
              <li key={to}>
                <Link
                  to={to}
                  onClick={onClose} 
                  className={`flex items-center gap-2 pl-1 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    active
                      ? "bg-white text-[#0a1d56] font-semibold shadow-md"
                      : "text-white hover:bg-[#132c72] hover:text-white"
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  <span className="flex items-center justify-center w-5 h-5">
                    {icon}
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
